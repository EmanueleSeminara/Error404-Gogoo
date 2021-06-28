const db = require("../db/db");

exports.listVehiclesByDestination = (idParcheggiatore) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.refVehicle, v.type, v.category, r.refParkingC, r.refParkingR, r.id, r.dateR, r.dateC, u.name, u.surname FROM vehicles as v JOIN reservations as r ON v.id = r.refVehicle JOIN parkings as p ON r.refParkingC = p.position JOIN users AS u ON u.id=r.refGuest WHERE p.refValet = ? ORDER BY r.dateC";
    db.all(sql, [idParcheggiatore], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const vehicles = rows.map((v) => ({
        id: v.refVehicle,
        type: v.type,
        category: v.category,
        refParkingR: v.refParkingR,
        refParkingC: v.refParkingC,
        idReservation: v.id,
        dateR: v.dateR,
        dateC: v.dateC,
        name: v.name,
        surname: v.surname,
      }));
      resolve(vehicles);
    });
  });
};

exports.listVehiclesInParking = (idParcheggiatore) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.refVehicle, v.type, v.category, r.refParkingC, r.refParkingR, r.id, r.dateR, r.dateC, u.name, u.surname FROM vehicles as v JOIN reservations as r ON v.id = r.refVehicle JOIN parkings as p ON r.refParkingC = p.position JOIN users AS u ON u.id=r.refGuest WHERE p.refValet = ? ORDER BY r.dateR";
    db.all(sql, [idParcheggiatore], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const vehicles = rows.map((v) => ({
        id: v.refVehicle,
        type: v.type,
        category: v.category,
        refParkingR: v.refParkingR,
        refParkingC: v.refParkingC,
        idReservation: v.id,
        dateR: v.dateR,
        dateC: v.dateC,
        name: v.name,
        surname: v.surname,
      }));
      resolve(vehicles);
    });
  });
};
