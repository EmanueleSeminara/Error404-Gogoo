const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const driverManagement = require("../models/driverManagement");
const isDriver = require("../middleware/isDriver");

// Prenotazioni prese in carico dall'autista corrispondente all'id passato
router.get("/myreservations/:id", isDriver, (req, res) => {
    try{
        await driverManagement.myReservation(req.params.id);
    } catch(err) {
        res.json({
            error: 'Database error when requesting reservations - ' + err,
        });
    }
});

// Prenotazioni non confermate da nessun autista
router.get("/reservationsnotconfirmed/", isDriver, (req, res) => {
    try{
        await driverManagement.reservationNotConfirmed(req.params.id);
    } catch(err) {
        res.json({
            error: 'Database error when requesting unconfirmed reservations - ' + err,
        });
    }
});

// Ritiro macchina
router.post("/retirevehicle", isDriver, (req, res) => {
    try{
        await driverManagement.reservationNotConfirmed(req.params.id);
    } catch(err) {
        res.json({
            error: 'Database error when requesting unconfirmed reservations - ' + err,
        });
    }
});

// Consegna macchina
router.post();