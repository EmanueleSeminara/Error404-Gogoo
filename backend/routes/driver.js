const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const driverManagement = require("../models/driverManagement");
const reservationManagement = require("../models/reservationManagement");
const vehicleManagement = require("../models/vehicleManagement");
const isDriver = require("../middleware/isDriver");
const mail = require("../models/mail");

// Prenotazioni prese in carico dall'autista corrispondente all'id passato
router.get("/myreservations/", isDriver, async (req, res) => {
  try {
    res.json(await driverManagement.myReservation(req.user.id));
  } catch (err) {
    res.status(503).json({
      error: "Database error when requesting reservations - " + err,
    });
  }
});

// Prenotazioni non confermate da nessun autista
router.get("/reservationsnotconfirmed/", isDriver, async (req, res) => {
  try {
    res.json(await driverManagement.reservationNotConfirmed());
  } catch (err) {
    res.status(503).json({
      error: "Database error when requesting unconfirmed reservations - " + err,
    });
  }
});

// Ritiro macchina
// router.put("/retirecar/", isDriver, async (req, res) => {
//   console.log("RITIRO: " + req.body.refVehicle, req.body.id);
//   const reservation = {
//     refDriver: req.user.id,
//     refVehicle: req.body.refVehicle,
//     id: req.body.id,
//   };
//   try {
//     await driverManagement.retireCar(reservation);
//     res.status(201).end();
//   } catch (err) {
//     res.status(503).json({
//       error: "Database error when requesting unconfirmed reservations - " + err,
//     });
//   }
// });

router.put("/retirecar", isDriver, async (req, res) => {
  console.log(req.body.id, req.body.refVehicle);
  try {
    const reservation = await reservationManagement.getReservationById(
      req.body.id
    );
    console.log(reservation);
    const dateNow = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" })
    );
    console.log(new Date(reservation.dateR) <= dateNow);
    if (
      reservation.refDriver === req.user.id &&
      reservation.refVehicle === req.body.refVehicle &&
      new Date(reservation.dateR) <= dateNow
    ) {
      reservation.state = "withdrawn";
      await vehicleManagement.updateState(reservation.refVehicle, "in use");
      await reservationManagement.changeState(reservation);
      res.status(200).end();
    } else {
      res.status(513).json({
        error: "Unable to collect the vehicle",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(503).json({
      error: "Database error while collecting the vehicle - " + err,
    });
  }
});

// Consegna macchina
// router.delete("/cardelivery/", isDriver, async (req, res) => {
//   console.log("CONSEGNA: " + req.query.refVehicle, req.query.id);
//   const reservation = {
//     refDriver: req.user.id,
//     refVehicle: req.query.refVehicle,
//     id: req.query.id,
//   };
//   try {
//     await driverManagement.carDelivery(reservation);
//     res.status(201).end();
//   } catch (err) {
//     res.status(503).json({
//       error: "Database error while canceling the reservation - " + err,
//     });
//   }
// });

router.delete("/cardelivery", isDriver, async (req, res) => {
  try {
    console.log(req.query.id, req.user.id, req.query.refVehicle);
    const reservation = await reservationManagement.getReservationById(
      req.query.id
    );
    console.log(
      reservation.refDriver == req.user.id,
      reservation.refVehicle == req.body.refVehicle,
      reservation.state == "withdrawn"
    );
    const dateNow = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" })
    );
    console.log(reservation);
    if (
      reservation.refDriver == req.user.id &&
      reservation.refVehicle == req.query.refVehicle &&
      reservation.state == "withdrawn"
    ) {
      await vehicleManagement.updateState("available", reservation.refVehicle);
      await reservationManagement.deleteReservationById(reservation.id);
      await vehicleManagement.changeRefParking(
        reservation.refParkingC,
        reservation.refVehicle
      );

      res.status(200).end();
    } else {
      res.status(513).json({
        error: "Unable to delivery the vehicle",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(503).json({
      error: "Database error while delivering the vehicle - " + err,
    });
  }
});

// Conferma prenotazione
router.put("/confirmationofreservation/:id", isDriver, async (req, res) => {
  try {
    await driverManagement.confirmationOfReservation(
      req.user.id,
      req.params.id
    );
    const user = await driverManagement.getUserByReservation(req.params.id);
    mail.sendNewReservationMail(user.email, user.name, req.params.id);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({
      error: "Database error while updating the reservation - " + err,
    });
  }
});

module.exports = router;
