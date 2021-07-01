const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const valetManagement = require("../models/valetManagement");
const reservationManagement = require("../models/reservationManagement");

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
// router.put("/deliveryvehicle/", isValet, async (req, res) => {
//   console.log(req.body);
//   const reservation = {
//     id: req.body.id,
//     refVehicle: req.body.refVehicle,
//     idValet: req.user.id,
//     dateC: req.body.dateC,
//   };
//   try {
    
//     await valetManagement.deliveryVehicle(reservation);
//     console.log("DELIVERY VEHICLEEEEE");
//     const deliveryDate = new Date(reservation.dateC).getTime();
//     const nowDate = new Date(
//       new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" })
//     ).getTime();
//     const deliveryDatetime = deliveryDate - nowDate;
//     // Scadenza orario di consegna
//     setTimeout(async () => {
//       try {
//         const isInReservations = await reservationManagement.isInReservations(
//           req.user.id,
//           reservation.id
//         );
//         console.log("isInReservation: " + isInReservations);
//         if (isInReservations) {
//           mail.sendExpiredDeliveryMail(
//             req.user.email,
//             req.user.name,
//             reservation.id
//           );
//           const admins = await userManagement.getAllAdmins();
//           admins.forEach((admin) => {
//             mail.sendExpiredDeliveryMail(admin.email, "Admin", reservation.id);
//           });
//           console.log("MANDA EMAIL!!");
//         }
//       } catch (err) {
//         console.log(err);
//       }

//       //console.log("Nome: " + req.user.name + " Cognome: " + req.user.surname);
//     }, deliveryDatetime);

//     // Mancata consegna
//     setTimeout(async () => {
//       try {
//         const isInReservations = await reservationManagement.isInReservations(
//           req.user.id,
//           reservation.id
//         );
//         console.log("isInReservation: " + isInReservations);
//         if (isInReservations) {
//           mail.sendDeliveryFailureyMail(
//             req.user.email,
//             req.user.name,
//             reservation.id
//           );
//           const admins = await userManagement.getAllAdmins();
//           admins.forEach((admin) => {
//             mail.sendDeliveryFailureyMailAdmin(
//               admin.email,
//               req.user.name,
//               reservation.id,
//               req.user.email
//             );
//           });
//           console.log("MANDA EMAIL!!");
//         }
//       } catch (err) {
//         console.log(err);
//       }

//       //console.log("Nome: " + req.user.name + " Cognome: " + req.user.surname);
//     }, deliveryDatetime + 14400000);
//     res.status(201).end();
//   } catch (err) {
//     res.json({
//       error: "Database error when requesting unconfirmed reservations - " + err,
//     });
//   }
// });


router.put("/deliveryvehicle", isValet, async (req, res) => {
  try {
    const reservation =
      await reservationManagement.getReservationById(
        req.body.id
      );
    const dateNow = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" })
    );
    if (reservation.refValetR === req.user.id && reservation.refVehicle === req.body.refVehicle && new Date(reservation.dateR) <= dateNow) {
      reservation.state = "withdrawn";
      await vehicleManagement.updateState(reservation.refVehicle, "in use");
      await reservationManagement.changeState(reservation);
      const deliveryDate = new Date(reservation.dateC).getTime();
    const nowDate = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" })
    ).getTime();
    const timerDatetime = deliveryDate - nowDate;
    console.log(
      "DATA TIMER CALCOLATA: " +
        new Date(timerDatetime) +
        "DATA IN MILLI: " +
        timerDatetime
    );
    // Scadenza orario di consegna
    setTimeout(async () => {
      try {
        const isInReservations = await reservationManagement.isInReservations(
          req.user.id,
          reservation.id
        );
        console.log("isInReservation: " + isInReservations);
        if (isInReservations) {
          mail.sendExpiredDeliveryMail(
            req.user.email,
            req.user.name,
            reservation.id
          );
          const admins = await userManagement.getAllAdmins();
          admins.forEach((admin) => {
            mail.sendExpiredDeliveryMail(admin.email, "Admin", reservation.id);
          });
          console.log("MANDA EMAIL!!");
        }
      } catch (err) {
        console.log(err);
      }

      //console.log("Nome: " + req.user.name + " Cognome: " + req.user.surname);
    }, timerDatetime);

    // Mancata consegna
    setTimeout(async () => {
      try {
        const isInReservations = await reservationManagement.isInReservations(
          req.user.id,
          reservation.id
        );
        console.log("isInReservation: " + isInReservations);
        if (isInReservations) {
          mail.sendDeliveryFailureyMail(
            req.user.email,
            req.user.name,
            reservation.id
          );
          const admins = await userManagement.getAllAdmins();
          admins.forEach((admin) => {
            mail.sendDeliveryFailureyMailAdmin(
              admin.email,
              req.user.name,
              reservation.id,
              req.user.email
            );
          });
          console.log("MANDA EMAIL!!");
        }
      } catch (err) {
        console.log(err);
      }

      //console.log("Nome: " + req.user.name + " Cognome: " + req.user.surname);
    }, timerDatetime + 14400000);
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






// Ritiro del mezzo al cliente
// router.delete("/retirevehicle/", isValet, async (req, res) => {
//   console.log("BODY: " + req.body.refVehicle, req.body.id);
//   const reservation = {
//     id: req.query.id,
//     refVehicle: req.query.refVehicle,
//     idValet: req.user.id,
//   };
//   try {
//     await valetManagement.retirevehicle(reservation);
//     res.status(201).end();
//   } catch (err) {
//     res.json({
//       error: "Database error while canceling the reservation - " + err,
//     });
//   }
// });

router.delete("/retirevehicle", isValet, async (req, res) => {
  try {
    console.log(req.query.id, req.user.id);
    const reservation =
      await reservationManagement.getReservationById(
        req.query.id,
      );
    const dateNow = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" })
    );
    console.log(reservation)
    if (reservation.refValetC === req.user.id && reservation.refVehicle === req.query.refVehicle && reservation.state == "withdrawn") {
      await vehicleManagement.updateState("available", reservation.refVehicle);
      await reservationManagement.deleteReservationById(reservation.id);
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



module.exports = router;
