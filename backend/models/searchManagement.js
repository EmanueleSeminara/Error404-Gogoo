const db = require("../db/db");
var distance = require("google-distance");
distance.apiKey = process.env.GOOGLE_KEY;


//4. RICERCA:
//  4.1 RICERCA VEICOLI:

// get all available vehicles
exports.searchVehicles = (type, dateR, dateC, startParking) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM vehicles AS v WHERE v.type = ? AND v.refParking = ? AND v.state != 'damage' AND v.id NOT IN(SELECT refVehicle FROM reservations WHERE DATE(?)< DATE(dateC) AND DATE(?)> DATE(dateR))";
    db.all(sql, [type, startParking, dateR, dateC], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const vehicles = rows.map((v) => ({
        id: v.id,
        type: v.type,
        category: v.category,
      }));
      resolve(vehicles);
    });
  });
};

exports.searchVehiclesForDrivers = (category) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM vehicles AS v WHERE v.state!= 'damage' AND v.type = 'car' AND category = ? AND v.refParking = 'Via Libertà' AND v. id NOT IN (SELECT refVehicle FROM reservations) LIMIT 1";
    db.all(sql, [category], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const vehicle = rows.map((v) => ({
        id: v.id,
        type: v.type,
        category: v.category,
      }));
      resolve(vehicle);
    });
  });
};

//  4.2 RICERCA AUTOMOBILI CON AUTISTA:

// // get all available vehicles stesso di sopra
// exports.searchVehicles = (type, dateR, dateC, startParking) => {
//     return new Promise((resolve, reject) => {
//         const sql = 'SELECT * FROM vehicles WHERE type = ? AND position = ? AND id NOT IN(SELECT refVehicles FROM reservations WHERE ((? >= dateR AND ? <= dateC) OR (? >= dateR AND ? <= dateC) OR (? <= dateR AND ? >=dateC) ))';
//         db.all(sql, [type, startParking, dateR, dateR, dateC, dateC, dateR, dateC], (err, rows) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             const vehicles = rows.map((v) => ({ id: v.id}));
//             resolve(vehicles);
//         });
//     });
// };

// get all available drivers
exports.searchDrivers = (dateR, dateC) => {
  return new Promise((resolve, reject) => {
    const sql =
      'SELECT * FROM users WHERE role = "driver" AND id NOT IN(SELECT reservations.refDriver FROM users JOIN reservations ON users.id = reservations.refDriver WHERE ((? >= dateR AND ? <= dateC) OR (? >= dateR AND ? <= dateC) OR (?<= dateR AND  ? >=dateC)))';
    db.all(sql, [dateR, dateR, dateC, dateC, dateR, dateC], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const drivers = rows.map((d) => ({ id: d.id, email: d.email }));
      resolve(drivers);
    });
  });
};

//  4.3 RICERCA AUTOMOBILI FUORI STALLO:  - DA RIVEDERE

// get all vehicles (in inglese) fuori stallo
exports.searchVehiclesOutOfStall = (dateR, dateC) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM vehicles AS v WHERE v.type = 'car' AND v.position != 'NULL' AND v.state != 'damage' AND v.id NOT IN(SELECT refVehicle FROM reservations AS r WHERE DATE(?)< DATE(r.dateC) AND DATE(?)> DATE(r.dateR))";
    db.all(sql, [dateR, dateC], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const vehicles = rows.map((v) => ({
        id: v.id,
        type: v.type,
        category: v.category,
        position: v.position,
      }));
      resolve(vehicles);
    });
  });
};
