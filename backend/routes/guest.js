// Sistemare tutte le vie e vedere se mettere alphanumeric
// Sistemare guasto al veicolo e sostituire il veicolo a tutte le prenotazioni

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const guestManagement = require("../models/guestManagement");
const vehicleManagement = require("../models/vehicleManagement");
const reservationManagement = require("../models/reservationManagement");
const mail = require("../models/mail");
const isGuest = require("../middleware/isGuest");

router.put(
  "/update",
  [
    check("email").isEmail(),
    check("name").isAlpha("it-IT", { ignore: " " }),
    check("surname").isAlpha("it-IT", { ignore: " " }),
    check("birthdate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("phone").isMobilePhone(["it-IT"]),
  ],
  isGuest,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const user = {
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      birthdate: req.body.birthdate,
      phone: req.body.phone,
      id: req.session.passport.user,
    };

    try {
      await guestManagement.updateUser(user);
      console.log(req.user.email);
      mail.sendInformationChangedMail(req.body.email, req.body.name);
      res.status(201).end();
    } catch (err) {
      if (err.errno == 19) {
        res.status(513);
      } else {
        res.status(503);
      }
      res.json({
        error: "Database error during the creation of user - " + err,
      });
    }
  }
);

router.get("/mydata", isGuest, async (req, res) => {
  //console.log(req.user)
  try {
    res.json(await guestManagement.getGuestData(req.session.passport.user));
  } catch (err) {
    res.status(503).json({
      error: "Database error during the creation of user - " + err,
    });
  }
});

router.post(
  "/addcarlicense",
  [
    check("number").isAlphanumeric(),
    check("date").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("a").isBoolean(),
    check("am").isBoolean(),
    check("a1").isBoolean(),
    check("a1").isBoolean(),
    check("b").isBoolean(),
  ],
  isGuest,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const carlicense = {
      refGuest: req.session.passport.user,
      number: req.body.number,
      date: req.body.date,
      a: req.body.a ? 1 : 0,
      am: req.body.am ? 1 : 0,
      a1: req.body.a1 ? 1 : 0,
      a2: req.body.a2 ? 1 : 0,
      b: req.body.b ? 1 : 0,
    };

    try {
      await guestManagement.createCarLicense(carlicense);
      mail.sendAddedLicenseMail(req.user.email, req.user.name);
      res.status(201).end();
    } catch (err) {
      if (err.errno == 19) {
        res.status(513);
      } else {
        res.status(503);
      }
      res.json({
        error: "Database error during the creation of user - " + err,
      });
    }
  }
);

router.get("/getdatacarlicense", isGuest, async (req, res) => {
  //console.log(req.user)
  try {
    const cl = await guestManagement.getCarLicenseData(
      req.session.passport.user
    );
    const carlicense = {
      number: cl.number,
      date: cl.date,
      a: cl.a ? true : false,
      am: cl.am ? true : false,
      a1: cl.a1 ? true : false,
      a2: cl.a2 ? true : false,
      b: cl.b ? true : false,
    };
    res.json(carlicense);
  } catch (err) {
    res.status(503).json({
      error: "Database error during the request of car license - " + err,
    });
  }
});

router.put(
  "/updatecarlicense",
  [
    check("number").isAlphanumeric(),
    check("date").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("a").isBoolean(),
    check("am").isBoolean(),
    check("a1").isBoolean(),
    check("a1").isBoolean(),
    check("b").isBoolean(),
  ],
  isGuest,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const carlicense = {
      refGuest: req.session.passport.user,
      number: req.body.number,
      date: req.body.date,
      a: req.body.a ? 1 : 0,
      am: req.body.am ? 1 : 0,
      a1: req.body.a1 ? 1 : 0,
      a2: req.body.a2 ? 1 : 0,
      b: req.body.b ? 1 : 0,
    };

    try {
      await guestManagement.updateCarLicense(carlicense);
      mail.sendModifiedLicenseMail(req.user.email, req.user.name);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: "Database error during the updating of car license - " + err,
      });
    }
  }
);

router.get("/listpayments", isGuest, async (req, res) => {
  try {
    res.json(await guestManagement.listPayments(req.session.passport.user));
  } catch (err) {
    res.status(503).json({
      error: "Database error during the request of payments - " + err,
    });
  }
});

router.delete(
  "/deletepayment/:id",
  [check("id").isInt({ min: 0 })],
  isGuest,
  async (req, res) => {
    try {
      await guestManagement.deletePaymentMethodById(req.params.id);
      mail.sendPaymentMethodRemovedMail(req.user.email, req.user.name);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: "Database error during the creation of user - " + err,
      });
    }
  }
);

router.post(
  "/addpaymentmethod",
  [
    check("number").isNumeric({ minLength: 16, maxLength: 16 }),
    check("date").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("cvv").isInt({ min: 0, max: 999 }),
    check("name").isAlpha("it-IT", { ignore: " " }),
    check("surname").isAlpha("it-IT", { ignore: " " }),
  ],
  isGuest,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const paymentmethod = {
      number: req.body.number,
      date: req.body.date,
      cvv: req.body.cvv,
      name: req.body.name,
      surname: req.body.surname,
    };

    try {
      await guestManagement.createPaymentMethod(
        req.session.passport.user,
        paymentmethod
      );
      mail.sendPaymentMethodAddedMail(req.user.email, req.user.name);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: "Database error during the updating of user - " + err,
      });
    }
  }
);

router.put("/retirevehicle", isGuest, async (req, res) => {
  const reservation = {
    refGuest: req.user.id,
    refVehicle: req.body.refVehicle,
    id: req.body.id,
  };
  try {
    await guestManagement.retireVehicle(reservation);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({
      error: "Database error when requesting vehicle collection - " + err,
    });
  }
});

router.put(
  "/damagedvehicle",
  isGuest,
  [check("position").isAlphanumeric("it-IT", { ignore: " " })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      await guestManagement.damagedVehicle(req.body.id, req.body.position);
      const vehicle = await vehicleManagement.getSimilarVehicle;
      await reservationManagement.updateVehicleInReservation(vehicle);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: "Database error when requesting vehicle status update - " + err,
      });
    }
  }
);

// Consegna fuori stallo
router.delete("/deliveryoutofstall", isGuest, async (req, res) => {
  console.log(
    req.query.id,
    req.query.refVehicle,
    req.user.id,
    req.query.position
  );
  const reservation = {
    id: req.query.id,
    refVehicle: req.query.refVehicle,
    refGuest: req.user.id,
    position: req.query.position,
  };
  try {
    const resp = await guestManagement.deliveryOutOfStall(reservation);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({
      error: "Database error when requesting vehicle status update - " + err,
    });
  }
});

router.get("/candeliveroutofstall", isGuest, async (res, req) => {
  const reservation = {
    refVehicle: req.query.refVehicle,
    id: req.query.id,
  };
  try {
    res.json(await guestManagement.canDeliverOutOfStall(reservation));
  } catch (err) {
    res.status(503).json({
      error: "Database error when requesting vehicle status update - " + err,
    });
  }
});

module.exports = router;
