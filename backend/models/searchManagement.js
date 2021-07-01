const db = require("../db/db");
var distance = require("google-distance");
distance.apiKey = process.env.GOOGLE_KEY;

// Restituisce una macchina che non sia danneggiata, che non abbia altre prenotazioni e che parta dal parcheggio principale
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

// Restituisce tutti gli autisti che non sono impegnati in altre prenotazioni
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

// Restituisce tutti i veicoli fuori stallo disponibili
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
