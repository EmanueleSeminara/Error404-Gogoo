const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
var distance = require("google-distance");

const searchManagement = require("../models/searchManagement");
const isLoggedIn = require("../middleware/isLoggedIn");

distance.apiKey = process.env.GOOGLE_KEY;

// const prova = (start, end) => {
//   return new Promise((resolve, reject) => {
//     distance.get(
//       {
//         origin: start + ", Palermo Italy",
//         destination: end + ", Palermo Italy",
//         mode: "walking",
//       },
//       function (err, data) {
//         if (err) return reject(err);
//         resolve(data);
//         // console.log(vehicle);
//         //return vehicle;
//       }
//     );
//   });
// };

router.post("/searchvehicles/", isLoggedIn, async (req, res) => {
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

router.post("/searchcarwithdriver", isLoggedIn, async (req, res) => {
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

router.get("/vehiclesoutofstall/", async (req, res) => {
  try {
    // console.log(
    //   "DATI DI REQ: " + req.query.start,
    //   req.query.dateR,
    //   req.query.dateC
    // );
    vehiclesOutOfStall = await searchManagement.searchVehiclesOutOfStall(
      req.query.dateR,
      req.query.dateC
    );
    //console.log("Veicoli trovati: " + vehiclesOutOfStall);
    //vehiclesOutOfStall.forEach((element) => console.log(element));
    //let prova = "";

    const orderedVehicles = await vehiclesOutOfStall.map(async (vehicle) => {
      try {
        const provolino = await searchManagement.prova(
          req.query.start,
          vehicle.position
        );
        //console.log(provolino);
        //   vehicle.distance = provolino.distance;
        //   vehicle.distanceValue = provolino.distanceValue;
        //   vehicle.duration = provolino.duration;
        //   return vehicle;
        console.log(provolino.distanceValue);
        return {
          id: vehicle.id,
          type: vehicle.type,
          category: vehicle.category,
          position: vehicle.position,
          distance: provolino.distance,
          distanceValue: provolino.distanceValue,
          duration: provolino.duration,
        };
      } catch (err) {
        console.log(err);
      }
    });
    orderedVehicles.forEach(element => {
        console.log(element);
    });

    //     distance.get(
    //           {
    //             origin: req.query.start + ", Palermo Italy",
    //             destination: element.position + ", Palermo Italy",
    //             mode: "walking",
    //           },
    //           function (err, data) {
    //             if (err) return res.send(err);
    //             element.distance = data.distance;
    //             element.distanceValue = data.distanceValue;
    //             element.duration = data.duration;
    //             //prova = data.duration;
    //             // console.log(vehicle);
    //             //return vehicle;
    //           }
    //         );
    //           console.log(element);
    // })
    // .map((vehicle) => {
    //     let array = []
    //     try{
    //         const pippo = searchManagement.prova(req.query.start, vehicle.position);
    //     } catch(err){
    //         console.log(err);
    //     }
    //     console.log("PIPPO: " + pippo);
    // .then((provoletta) => {
    //     console.log(provoletta)
    //     array.push(provoletta);
    //     //return provoletta
    // });
    // console.log("ARRAY: " + array);
    //console.log("ECCOLA: " + a);
    // distance.get(
    //   {
    //     origin: req.query.start + ", Palermo Italy",
    //     destination: vehicle.position + ", Palermo Italy",
    //     mode: "walking",
    //   },
    //   function (err, data) {
    //     if (err) return res.send(err);
    //     vehicle.distance = data.distance;
    //     vehicle.distanceValue = data.distanceValue;
    //     vehicle.duration = data.duration;
    //     prova = data.duration;
    //     // console.log(vehicle);
    //     //return vehicle;
    //   }
    // );
    //console.log("PROVA: " + prova);
    //return vehicle;
    // });
    //.sort((first, second) => first.distanceValue - second.distanceValue);
    //orderedVehicles.forEach((element) => console.log("CI PROVO: " + element));
    res.json(orderedVehicles);
    //res.json(await searchManagement.searchVehiclesOutOfStall(req.query.dateR, req.query.dateC));
  } catch (err) {
    res.status(503).json({
      error: "Database error during the creation of user - " + err,
    });
  }
});

module.exports = router;
