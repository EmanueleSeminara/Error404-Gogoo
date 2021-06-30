const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const reservationManagement = require("../models/reservationManagement");
const userManagement = require("../models/userManagement");
const isGuest = require("../middleware/isGuest");
const mail = require("../models/mail");

// visualizza prenotazioni - segnala guasto - ritiro e consegna - ritardo consegna - consegna fuori stallo

// Aggiunge prenotazione con autista
router.post(
  "/addreservationwithdriver",
  [
    check("refVehicle").isInt(),
    //check("id").isInt(),
    //check("dateR").isDate({ format: "YYYY-MM-DD HH:MM", strictMode: true }),
    //check("dateC").isDate({ format: "YYYY-MM-DD HH:MM", strictMode: true }),
    check("refParkingR")
      .isAlpha("it-IT", { ignore: " " })
      .optional({ checkFalsy: true }),
    check("refParkingC").isAlpha("it-IT", { ignore: " " }).optional({ checkFalsy: true }),
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
      refParkingR: 'Via Libertà',
      refParkingC: 'Via Libertà',
      positionR: req.body.positionR,
      positionC: req.body.positionC,
    };

    console.log(reservation);

    try {
      await reservationManagement.addReservationWithDriver(reservation, req.user.id);
      mail.sendNewReservationMail(req.user.email, req.user.name);
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

// Aggiunge una prenotazione normale
router.post(
  "/add",
  [
    check("refVehicle").isInt(),
    //check("id").isInt(),
    //check("dateR").isDate({ format: "YYYY-MM-DD HH:MM", strictMode: true }),
    //check("dateC").isDate({ format: "YYYY-MM-DD HH:MM", strictMode: true }),
    check("refParkingR")
      .isAlpha("it-IT", { ignore: " " })
      .optional({ checkFalsy: true }),
    check("refParkingC").isAlpha("it-IT", { ignore: " " }),
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
      positionC: req.body.positionC,
    };

    console.log(reservation);

    try {
      const idReservation = await reservationManagement.addReservation(reservation, req.user.id);
      console.log("idReservation: " + idReservation);
      mail.sendNewReservationMail(req.user.email, req.user.name, idReservation);
      const deliveryDate = new Date(reservation.dateC).getTime();
      const nowDate = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Rome"})).getTime();
      const deliveryDatetime =  deliveryDate - nowDate;
      
      setTimeout(async () => {
        try{
          const isInReservations = await reservationManagement.isInReservations(req.user.id, idReservation);
          console.log("isInReservation: " + isInReservations);
          if(isInReservations){
            mail.sendsendExpiredDeliveryMail(req.user.email, req.user.name, idReservation);
            const admins = await userManagement.getAllAdmins();
            admins.forEach((admin) => {
              mail.sendsendExpiredDeliveryMail(admin.email, 'Admin', idReservation);
            })
            console.log("MANDA EMAIL!!");
          }
        }catch(err){
          console.log(err);
        }
        
        //console.log("Nome: " + req.user.name + " Cognome: " + req.user.surname);
      }, deliveryDatetime);
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

router.get("/myreservations", isGuest, async (req, res) => {
  try {
    res.json(await reservationManagement.getMyReservations(req.user.id));
  } catch (err) {
    res
      .status(503)
      .json({
        error: "Database error during the request of reservations - " + err,
      });
  }
});

router.get("/myreservationsnotwithdrawn", isGuest, async (req, res) => {
  console.log("SEI DENTRO PIRLA!!")
  try {
    res.json(await reservationManagement.getMyReservationsNotWithdrawn(req.user.id));
  } catch (err) {
    res
      .status(503)
      .json({
        error: "Database error during the request of reservations - " + err,
      });
  }
});

router.put(
  "/damagedvehicle",
  isGuest,
  [check("position").isAlpha("it-IT", { ignore: " " })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      await reservationManagement.damagedVehicle(
        req.body.id,
        req.body.position
      );
      res.status(201).end();
    } catch (err) {
      res
        .status(503)
        .json({
          error:
            "Database error when requesting vehicle status update - " + err,
        });
    }
  }
);

// router.put("/retirevehicle:idVehicle", isGuest, async (req, res) => {
//     try{
//         await reservationManagement.retireVehicle(req.params.idVehicle);
//         res.status(201).end();
//     }catch(err){
//         res.status(503).json({error: 'Database error when requesting vehicle collection - ' + err});
//     }
// })

router.delete("/delete/:id", isGuest, async (req, res) => {
  try {
    await reservationManagement.deleteReservationById(req.params.id);
    mail.sendReservationDeletedMail(
      req.user.email,
      req.user.name,
      req.params.id
    );
    res.status(201).end();
  } catch (err) {
    res
      .status(503)
      .json({
        error: "Database error while deleting the reservation - " + err,
      });
  }
});

// data ora parcheggi
router.put("/edit", isGuest, async (req, res) => {
  const reservation = {
    dateR: req.body.dateR,
    dateC: req.body.dateC,
    refParkingR: req.body.refParkingR,
    refParkingC: req.body.refParkingC,
    id: req.body.id,
    refVehicle: req.body.refVehicle,
  };
  console.log(reservation);
  try {
    await reservationManagement.updateReservation(reservation);
    mail.sendReservationEditedMail(req.user.email, req.user.name, req.body.id);
    res.status(201).end();
  } catch (err) {
    res
      .status(503)
      .json({
        error: "Database error while deleting the reservation - " + err,
      });
  }
});

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
