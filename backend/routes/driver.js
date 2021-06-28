const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const driverManagement = require("../models/driverManagement");
const isDriver = require("../middleware/isDriver");

// Prenotazioni prese in carico dall'autista corrispondente all'id passato
router.get("/myreservations/:id", isDriver, async (req, res) => {
    try{
        res.json(await driverManagement.myReservation(req.params.id));
    } catch(err) {
        res.json({
            error: 'Database error when requesting reservations - ' + err,
        });
    }
});

// Prenotazioni non confermate da nessun autista
router.get("/reservationsnotconfirmed/", isDriver, async (req, res) => {
    try{
        res.json(await driverManagement.reservationNotConfirmed(req.params.id));
    } catch(err) {
        res.json({
            error: 'Database error when requesting unconfirmed reservations - ' + err,
        });
    }
});

// Ritiro macchina
router.post("/retirevehicle/:id", isDriver, async (req, res) => {
    const reservation = {
        refDriver: req.user.id,
        refVehicle: req.body.refVehicle,
        id: req.body.id,
      };
    try{
        await driverManagement.retireVehicle(reservation);
        res.status(201).end();
    } catch(err) {
        res.json({
            error: 'Database error when requesting unconfirmed reservations - ' + err,
        });
    }
});

// Consegna macchina - da finire
router.post("/", isDriver, (req, res) => {
    try{

    }catch(err){

    }
});

module.exports = router;