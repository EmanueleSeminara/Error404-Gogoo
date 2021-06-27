const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const reservationManagement = require("../models/reservationManagement");
const isGuest = require("../middleware/isGuest");

// visualizza prenotazioni - segnala guasto - ritiro e consegna - ritardo consegna - consegna fuori stallo


// Aggiunge prenotazione con autista
router.post("/addreservationwithdriver", async (req, res) => {
    
})

// Aggiunge una prenotazione normale
router.post(
    "/add",
    [
        check("refVehicle").isInt(),
        //check("id").isInt(),
        //check("dateR").isDate({ format: "YYYY-MM-DD HH:MM", strictMode: true }),
        //check("dateC").isDate({ format: "YYYY-MM-DD HH:MM", strictMode: true }),
        check("refParkingR").isAlpha('it-IT', { ignore: ' ' }).optional({checkFalsy: true}),
        check("refParkingC").isAlpha('it-IT', { ignore: ' ' }),
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
            positionC: req.body.positionC
        };

        console.log(reservation);

        try {
            await reservationManagement.addReservation(reservation, req.user.id);
            //EMAIL MANCANTE
            res.status(201).end();
        } catch (err) {
            if (err.errno == 19) {
                res.status(513);
            } else {
                res.status(503);
            }
            res.json({
                error: 'Database error during the creation of user - ' + err,
            });
        }
    }
);

router.get("/myreservations/", isGuest, async (req, res) => {
    try{
        res.json(await reservationManagement.getmyreservation(req.user.id));
    } catch(err){
        res.status(503).json({error: 'Database error during the request of reservations - ' + err});
    }
})

router.put("/damagedvehicle", isGuest, [check("position").isAlpha('it-IT', { ignore: ' ' })], async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(422).json({ errors: errors.array() });
        }
    try{
        await reservationManagement.damagedVehicle(req.body.id, req.body.position);
        res.status(201).end();
    }catch(err){
        res.status(503).json({error: 'Database error when requesting vehicle status update - ' + err});
    }
})

// router.put("/retirevehicle:idVehicle", isGuest, async (req, res) => {
//     try{
//         await reservationManagement.retireVehicle(req.params.idVehicle);
//         res.status(201).end();
//     }catch(err){
//         res.status(503).json({error: 'Database error when requesting vehicle collection - ' + err});
//     }
// })

router.delete("/delete/:id", isGuest, async (req, res) => {
    try{
        await reservationManagement.deleteReservationById(req.params.id);
        res.status(201).end();
    } catch(err){
        res.status(503).json({error: 'Database error while deleting the reservation - ' + err});
    }
})

// data ora parcheggi
router.put("/edit", isGuest, async (req, res) => {
    console.log("Sei dentro edit");
    const reservation = {
        dateR: req.body.dateR,
        dateC: req.body.dateC,
        refParkingR: req.body.refParkingR,
        refParkingC: req.body.refParkingC,
        id: req.body.id,
        refVehicle: req.body.refVehicle
    }
    console.log(reservation);
    try{
        await reservationManagement.updateReservation(reservation);
    }catch(err){
        res.status(503).json({error: 'Database error while deleting the reservation - ' + err});
    }
})

// router.get(
//     BASEURL + "/reservation/getreservationdata/:id",
//     isLoggedIn,
//     async (req, res) => {
//       try {
//         res.json(await ReservationManagement.getReservationDataById(req.params.id));
//       } catch (err) {
//         res.status(503).json({
//           error: 'Database error during the creation of user - ' + err,
//         });
//       }
//     }
//   );
  
//   router.put(
//     BASEURL + "/reservation/retirevehicle/:id",
//     isLoggedIn,
//     async (req, res) => {
  
//       try {
//         await postReservationManagement.retireVehicle(req.params.id);
//         res.status(201).end();
//       } catch (err) {
//         res.status(503).json({
//           error: 'Database error during the updating of vehicle - ' + err,
//         });
//       }
//     }
//   );
  
//   router.put(
//     BASEURL + "/reservation/deliveryvehicle/:id",
//     isLoggedIn,
//     async (req, res) => {
  
//       try {
//         await postReservationManagement.deliveryVehicle(req.params.id);
//         res.status(201).end();
//       } catch (err) {
//         res.status(503).json({
//           error: 'Database error during the updating of vehicle - ' + err,
//         });
//       }
//     }
//   );
  
//   router.delete(
//     BASEURL + "/reservation/deletereservation/:id",
//     isLoggedIn,
//     async (req, res) => {
//       try {
//         await rservationManagement.deleteReservationById(req.params.id);
//         res.status(201).end();
//       } catch (err) {
//         res.status(503).json({
//           error: 'Database error while canceling the reservation - ' + err,
//         });
//       }
//     }
//   );
  
//   router.put(
//     BASEURL + "/reservation/vehicleBreakdown/",
//     [
//       check("id").isInt(),
//       check("position").isAlpha('it-IT', { ignore: ' ' })
//     ],
//     isLoggedIn,
//     async (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//       }
  
//       try {
//         await postReservationManagement.vehicleBreakdown(req.body.id, req.body.position);
//         res.status(201).end();
//       } catch (err) {
//         res.status(503).json({
//           error: 'Database error during the updating of reservation - ' + err,
//         });
//       }
//     }
//   );
  
//   router.get(
//     BASEURL + "/reservation/vehiclewithoutreservation/",
//     isLoggedIn,
//     async (req, res) => {
//       try {
//         res.json(await postReservationManagement.getVehicleWithoutReservation(req.query.type, req.query.category, req.query.position));
//       } catch (err) {
//         res.status(503).json({
//           error: 'Database error during the request of reservations - ' + err,
//         });
//       }
//     }
//   );
  
//   router.put(
//     BASEURL + "/reservation/updatevehicleinreservations/",
//     [
//       check("id").isInt(),
//       check("newId").isInt()
//     ],
//     isLoggedIn,
//     async (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//       }
  
//       try {
//         await postReservationManagement.updateVehicleInReservations(req.body.id, req.body.newId);
//         res.status(201).end();
//       } catch (err) {
//         res.status(503).json({
//           error: 'Database error during the updating of reservation - ' + err,
//         });
//       }
//     }
//   );
  
//   router.put(
//     BASEURL + "/reservation/updatereservation/",
//     [
//       check("refParkingC").isAlpha('it-IT', { ignore: ' ' }),
//       check("id").isInt(),
//       check("refVehicles").isInt()
//     ],
//     isLoggedIn,
//     async (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//       }
  
//       const reservation = {
//         refParkingC: req.body.refParkingC,
//         id: req.body.id,
//         refVehicles: req.body.refVehicles
//       };
  
//       try {
//         await reservationManagement.updateReservation(reservation);
//         res.status(201).end();
//       } catch (err) {
//         res.status(503).json({
//           error: 'Database error during the updating of reservation - ' + err,
//         });
//       }
//     }
//   );


module.exports = router;