const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
var distance = require("../models/distance");

const searchManagement = require("../models/searchManagement");
const isGuest = require("../middleware/isGuest");


router.post("/searchvehicles/", isGuest, async (req, res) => {
  try {
    console.log(
      "DATI DI REQ: " + req.body.type,
      req.body.dateR,
      req.body.dateC,
      req.body.refParkingR
    );
    res.json(
      await searchManagement.searchVehicles(
        req.body.type,
        req.body.dateR,
        req.body.dateC,
        req.body.refParkingR
      )
    );
  } catch (err) {
    res.status(503).json({
      error: "Database error during the creation of user - " + err,
    });
  }
});

router.post("/searchcarwithdriver", isGuest, async (req, res) => {
  try {
    if (
      await searchManagement.searchDrivers(req.params.dateR, req.params.dateC)
    ) {
      res.json(
        await searchManagement.searchVehicles(
          req.params.category,
          req.params.dateR,
          req.params.dateC,
          req.params.startParking
        )
      );
    } else {
      res.status(514).json({ error: "No driver available" });
    }
  } catch (err) {
    res.status(503).json({
      error: "Database error during the creation of user - " + err,
    });
  }
});

router.get("/vehiclesoutofstall/", isGuest, async (req, res) => {
  try {
    vehiclesOutOfStall = await searchManagement.searchVehiclesOutOfStall(
      req.query.dateR,
      req.query.dateC
    );
    Promise.all(
      vehiclesOutOfStall.map(async (vehicle) => {
        try {
          const data = await distance.get(req.query.start, vehicle.position);
          return {
            id: vehicle.id,
            type: vehicle.type,
            category: vehicle.category,
            position: vehicle.position,
            distance: data.distance,
            distanceValue: data.distanceValue,
            duration: data.duration,
          };
        } catch (err) {
          console.log(err);
        }
      })
    ).then((data) => {
      console.log(data);
      res.json(
        data.sort((first, second) => first.distanceValue - second.distanceValue)
      );
    });
  } catch (err) {
    res.status(503).json({
      error: "Database error during the creation of user - " + err,
    });
  }
});

module.exports = router;
