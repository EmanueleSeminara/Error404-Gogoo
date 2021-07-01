const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const vehicleManagement = require("../models/vehicleManagement");
const isAdmin = require("../middleware/isAdmin");
const isLoggedIn = require("../middleware/isLoggedIn");

// Aggiunge un nuovo veicolo
router.post(
  "/add",
  [
    check("type").isIn(["electric scooter", "scooter", "car", "bicycle"]),
    check("category").isIn(["sedan", "utilitaire", "suv", ""]),
    check("refParking").isAlpha("it-IT", { ignore: " " }),
  ],
  isAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const vehicle = {
      type: req.body.type,
      category: req.body.category,
      refParking: req.body.refParking,
    };
    try {
      await vehicleManagement.createVehicle(vehicle);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: "Database error during the updating of user - " + err,
      });
    }
  }
);

// Lista veicoli per tipo
router.get(
  "/listvehicle/:type",
  isLoggedIn,
  [check("type").isIn(["electric scooter", "scooter", "car", "bicycle"])],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      res.json(await vehicleManagement.listVehicle(req.params.type));
    } catch (err) {
      res.status(503).json({
        error: "Database error during the creation of user - " + err,
      });
    }
  }
);

// Elimina veicolo per id
router.delete("/delete/:id", isAdmin, async (req, res) => {
  try {
    await vehicleManagement.deleteVehiclesById(req.params.id);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({
      error: "Database error during the creation of user - " + err,
    });
  }
});

// Aggiorna veicolo
router.put(
  "/updatevehicle",
  [
    check("type").isIn(["electric scooter", "scooter", "car", "bicycle"]),
    check("id").isInt(),
    check("refParking").isAlpha("it-IT", { ignore: " " }),
  ],
  isAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const vehicle = {
      id: req.body.id,
      refParking: req.body.refParking,
      state: req.body.state,
    };

    try {
      await vehicleManagement.updateVehicle(vehicle);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: "Database error during the updating of user - " + err,
      });
    }
  }
);

module.exports = router;
