const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const mail = require("../models/mail");
const adminManagement = require("../models/adminManagement");
const isAdmin = require("../middleware/isAdmin");

// Rimuovi utente - Ricerca utenti per ruolo
router.get(
  "/listusers/:role",
  [check("role").isIn(["guest", "admin", "valet", "driver"])],
  isAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      res.json(await adminManagement.listUsersByRole(req.params.role));
    } catch (err) {
      res.status(503).json({
        error: "Database error during the request of users - " + err,
      });
    }
  }
);

// Rimuovi utente - Elimina l'utente per id
router.delete("/delete/:userId", isAdmin, async (req, res) => {
  try {
    await adminManagement.deleteUserById(req.params.userId);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({
      error: "Database error during the elimination of user - " + err,
    });
  }
});

// Modifica dati utente - Ricerca utenti per ruolo, nome e cognome
router.get(
  "/listusers",
  [
    check("role").isIn(["guest", "admin", "valet", "driver"]),
    check("name").isAlpha("it-IT", { ignore: " " }),
    check("surname").isAlpha("it-IT", { ignore: " " }),
  ],
  isAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      res.json(
        await adminManagement.listUsers(
          req.query.role,
          req.query.name,
          req.query.surname
        )
      );
      res.status(201).end();
    } catch (err) {
      if (err.errno == 19) {
        res.status(513);
      } else {
        res.status(503);
      }
      res.json({
        error: "Database error during the request of users - " + err,
      });
    }
  }
);

// Modifica dati utente - Modifica l'utente selezionato
router.put(
  "/updateuser",
  [
    check("email").isEmail(),
    check("name").isAlpha("it-IT", { ignore: " " }),
    check("surname").isAlpha("it-IT", { ignore: " " }),
    check("birthdate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("phone").isMobilePhone(["it-IT"]),
    check("password").isStrongPassword(),
    check("id").isInt(),
  ],
  isAdmin,
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
      id: req.body.id,
      password: await bcrypt.hash(req.body.password, 10),
    };
    try {
      await adminManagement.updateUser(user);
      mail.sendInformationChangedMail(req.body.email, req.body.name);
      res.status(201).end();
    } catch (err) {
      if (err) {
        res.status(513);
      } else {
        res.status(503);
      }
      res.json({
        error: "Database error during the updating of user - " + err,
      });
    }
  }
);

// Aggiungi utente - Crea un nuovo utente
router.post(
  "/createuser",
  [
    check("email").isEmail(),
    check("name").isAlpha("it-IT", { ignore: " " }),
    check("surname").isAlpha("it-IT", { ignore: " " }),
    check("birthdate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("phone").isMobilePhone(["it-IT"]),
    check("password").isStrongPassword(),
    check("role").isIn(["guest", "admin", "valet", "driver"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      birthdate: req.body.birthdate,
      phone: req.body.phone,
      role: req.body.role,
      password: hashPassword,
    };

    try {
      await adminManagement.createUser(user);
      mail.sendWelcomeMail(user.email, user.name);
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

// Prenotazioni effettuate - Ricera le prenotazioni del cliente per email
router.get(
  "/reservations",
  [check("email").isEmail()],
  isAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      res.json(await adminManagement.getReservations(req.query.email));
    } catch (err) {
      res.status(503).json({
        error: "Database error when requesting reservations - " + err,
      });
    }
  }
);

// Prenotazioni effettuate - Elimina la prenotazione per id
router.delete(
  "/deletereservation/:id",
  [check("email").isEmail(), check("name").isAlpha("it-IT", { ignore: " " })],
  isAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      await adminManagement.deleteReservationById(req.params.id);
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
  }
);

// Visualizza prenotazioni - Modifica i dati della prenotazione
router.put(
  "/editreservation",
  isAdmin,
  [
    check("refParkingR").isAlpha("it-IT", { ignore: " " }),
    check("refParkingC").isAlpha("it-IT", { ignore: " " }),
    check("refVehicle").isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    const reservation = {
      dateR: req.body.dateR,
      dateC: req.body.dateC,
      refParkingR: req.body.refParkingR,
      refParkingC: req.body.refParkingC,
      id: req.body.id,
      refVehicle: req.body.refVehicle,
    };
    try {
      await adminManagement.updateReservation(reservation);
      mail.sendReservationEditedMail(
        req.user.email,
        req.user.name,
        req.body.id
      );
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: "Database error while deleting the reservation - " + err,
      });
    }
  }
);

module.exports = router;
