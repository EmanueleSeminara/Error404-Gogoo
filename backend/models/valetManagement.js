const db = require("../db/db");

// Restituisce tutti i veicoli che hanno come parcheggio di consegna quello in cui si trova il parcheggiatore associato all'id passato come parametro
exports.listVehiclesByDestination = (idParcheggiatore) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.refVehicle, v.type, v.category, r.refParkingC, r.refParkingR, r.id, r.dateR, r.dateC, u.name, u.surname, r.state FROM vehicles as v JOIN reservations as r ON v.id = r.refVehicle JOIN parkings as p ON r.refParkingC = p.position JOIN users AS u ON u.id=r.refGuest WHERE p.refValet = ? ORDER BY r.dateC";
    db.all(sql, [idParcheggiatore], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const reservations = rows.map((reservation) => ({
        refVehicle: reservation.refVehicle,
        type: reservation.type,
        category: reservation.category,
        refParkingR: reservation.refParkingR,
        refParkingC: reservation.refParkingC,
        id: reservation.id,
        dateR: reservation.dateR,
        dateC: reservation.dateC,
        name: reservation.name,
        surname: reservation.surname,
        state: reservation.state,
      }));
      resolve(reservations);
    });
  });
};

// Restituisce tutti i veicoli che hanno come parcheggio di ritiro quello in cui si trova il parcheggiatore associato all'id passato come parametro
exports.listVehiclesInParking = (idParcheggiatore) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.refVehicle, v.type, v.category, r.refParkingC, r.refParkingR, r.id, r.dateR, r.dateC, u.name, u.surname FROM vehicles as v JOIN reservations as r ON v.id = r.refVehicle JOIN parkings as p ON r.refParkingC = p.position JOIN users AS u ON u.id=r.refGuest WHERE r.state='confirmed' AND p.refValet = ? ORDER BY r.dateR";
    db.all(sql, [idParcheggiatore], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const reservations = rows.map((reservation) => ({
        refVehicle: reservation.refVehicle,
        type: reservation.type,
        category: reservation.category,
        refParkingR: reservation.refParkingR,
        refParkingC: reservation.refParkingC,
        id: reservation.id,
        dateR: reservation.dateR,
        dateC: reservation.dateC,
        name: reservation.name,
        surname: reservation.surname,
      }));
      resolve(reservations);
    });
  });
};
