const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const reservationManagement = require("../models/reservationManagement");
const isGuest = require("../middleware/isGuest");
const mail = require("../models/mail");

// Aggiunge prenotazione con autista
router.post(
  "/addreservationwithdriver",
  [
    check("refVehicle").isInt(),
    check("refParkingR")
      .isAlpha("it-IT", { ignore: " " })
      .optional({ checkFalsy: true }),
    check("refParkingC")
      .isAlpha("it-IT", { ignore: " " })
      .optional({ checkFalsy: true }),
  ],
  isGuest,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }

    const reservation = {
      refVehicle: req.body.refVehicle,
      dateR: req.body.dateR,
      dateC: req.body.dateC,
      refParkingR: "Via Libertà",
      refParkingC: "Via Libertà",
      positionR: req.body.positionR,
      positionC: req.body.positionC,
    };

    try {
      await reservationManagement.addReservationWithDriver(
        reservation,
        req.user.id
      );
      mail.sendReservationBeingProcessedMail(req.user.email, req.user.name);
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

// Aggiunge una prenotazione normale
router.post(
  "/add",
  [
    check("refVehicle").isInt(),
    check("refParkingR")
      .isAlpha("it-IT", { ignore: " " })
      .optional({ checkFalsy: true }),
    check("refParkingC").isAlpha("it-IT", { ignore: " " }),
  ],
  isGuest,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }

    const reservation = {
      refVehicle: req.body.refVehicle,
      dateR: req.body.dateR,
      dateC: req.body.dateC,
      refParkingR: req.body.refParkingR,
      refParkingC: req.body.refParkingC,
      positionR: req.body.positionR,
      positionC: req.body.positionC,
    };

    try {
      const idReservation = await reservationManagement.addReservation(
        reservation,
        req.user.id
      );
      mail.sendNewReservationMail(req.user.email, req.user.name, idReservation);
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

// Restituisce le prenotazioni
router.get("/myreservations", isGuest, async (req, res) => {
  try {
    res.json(await reservationManagement.getMyReservations(req.user.id));
  } catch (err) {
    res.status(503).json({
      error: "Database error during the request of reservations - " + err,
    });
  }
});

// Restituisce le prenotazioni non ritirate
router.get("/myreservationsnotwithdrawn", isGuest, async (req, res) => {
  try {
    res.json(
      await reservationManagement.getMyReservationsNotWithdrawn(req.user.id)
    );
  } catch (err) {
    res.status(503).json({
      error: "Database error during the request of reservations - " + err,
    });
  }
});

// Segnala un guasto al veicolo
router.put(
  "/damagedvehicle",
  isGuest,
  [check("position").isAlpha("it-IT", { ignore: " " })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      await reservationManagement.damagedVehicle(
        req.body.id,
        req.body.position
      );
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: "Database error when requesting vehicle status update - " + err,
      });
    }
  }
);

// Elimina la prenotazione
router.delete("/delete/:id", isGuest, async (req, res) => {
  try {
    await reservationManagement.deleteReservationById(req.params.id);
    mail.sendReservationDeletedMail(
      req.user.email,
      req.user.name,
      req.params.id
    );
    res.status(201).end();
  } catch (err) {
    res.status(503).json({
      error: "Database error while deleting the reservation - " + err,
    });
  }
});

// Modifica la prenotazione
router.put("/edit", isGuest, async (req, res) => {
  const reservation = {
    dateR: req.body.dateR,
    dateC: req.body.dateC,
    refParkingR: req.body.refParkingR,
    refParkingC: req.body.refParkingC,
    id: req.body.id,
    refVehicle: req.body.refVehicle,
  };
  try {
    await reservationManagement.updateReservation(reservation);
    mail.sendReservationEditedMail(req.user.email, req.user.name, req.body.id);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({
      error: "Database error while deleting the reservation - " + err,
    });
  }
});

// Verifica se la prenotazione può essere modificata
router.get("/canteditreservation", isGuest, async (req, res) => {
  try {
    res.json(
      await reservationManagement.canTEditReservation(
        req.query.refVehicle,
        req.query.id
      )
    );
  } catch (err) {
    res.status(503).json({
      error: "Database error while deleting the reservation - " + err,
    });
  }
});

module.exports = router;
