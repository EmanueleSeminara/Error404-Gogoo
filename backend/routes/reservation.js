const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const reservationManagement = require("../models/reservationManagement");

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