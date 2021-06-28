const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const valetManagement = require("../models/valetManagement");
const isValet = require("../middleware/isValet");

// Prenotazioni presenti nel parcheggio del parcheggiatore che fa la chiamata
router.get("/reservationsinmyparking/", isValet, async (req, res) => {
  try {
    res.json(await valetManagement.listVehiclesInParking(req.user.id));
  } catch (err) {
    res.json({
      error: "Database error when requesting reservations - " + err,
    });
  }
});

// Prenotazioni che arriveranno nel parcheggio del parcheggiatore che fa la chiamata
router.get("/vehiclesgoingtomyparking/", isValet, async (req, res) => {
  console.log("Veicoli che arriveranno nel mio parcheggio");
  try {
    res.json(await valetManagement.listVehiclesByDestination(req.user.id));
  } catch (err) {
    res.json({
      error: "Database error when requesting reservations - " + err,
    });
  }
});

// Consegna del mezzo al cliente
router.put("/deliveryvehicle/", isValet, async (req, res) => {
  console.log(req.body);
  const reservation = {
    refDriver: req.body.id,
    refVehicle: req.body.refVehicle,
    idValet: req.user.id,
  };
  try {
    await valetManagement.deliveryVehicle(reservation);
    res.status(201).end();
  } catch (err) {
    res.json({
      error: "Database error when requesting unconfirmed reservations - " + err,
    });
  }
});

// Ritiro del mezzo al cliente
router.delete("/retirevehicle/", isValet, async (req, res) => {
  const reservation = {
    refDriver: req.body.id,
    refVehicle: req.body.refVehicle,
    idValet: req.user.id,
  };
  try {
    await valetManagement.retirevehicle(reservation);
    res.status(201).end();
  } catch (err) {
    res.json({
      error: "Database error while canceling the reservation - " + err,
    });
  }
});


module.exports = router;
