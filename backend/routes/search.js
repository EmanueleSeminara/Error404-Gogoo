const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const searchManagement = require("../models/searchManagement");
const isLoggedIn = require("../middleware/isLoggedIn");

router.post(
    "/searchvehicles/",
    isLoggedIn,
    async (req, res) => {
        try {
            res.json(await searchManagement.searchVehicles(req.params.category, req.params.dateR, req.params.dateC, req.params.startParking));
        } catch (err) {
            res.status(503).json({
                error: 'Database error during the creation of user - ' + err,
            });
        }
    }
);

router.post("/searchcarwithdriver", isLoggedIn, async (req, res) => {
    try {
        if (await searchManagement.searchDrivers(req.params.dateR, req.params.dateC)) {
            res.json(await searchManagement.searchVehicles(req.params.category, req.params.dateR, req.params.dateC, req.params.startParking));
        }
        else {
            res.status(514).json({ error: 'No driver available' });
        }
    } catch (err) {
        res.status(503).json({
            error: 'Database error during the creation of user - ' + err,
        });
    }
});

module.exports = router;