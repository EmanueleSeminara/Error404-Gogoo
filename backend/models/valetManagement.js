const db = require("../db/db");

exports.listVehiclesByDestination = (idParcheggiatore) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM vehicles as v JOIN reservations as r ON v.id = r.refVehicle JOIN parkings as p ON r.refParkingC = p.position WHERE p.refValet = ? ORDER BY r.dateC";
    db.all(sql, [idParcheggiatore], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const veicoli = rows.map((v) => ({
        idVehicle: v.id,
        type: v.type,
        categoryr: v.category,
        refParking: v.refParking,
        idReservation: r.id,
        DateR: r.dateR,
        DateC: r.dateC,
      }));
      resolve(veicoli);
    });
  });
};

exports.listVehiclesInParking = (idParcheggiatore) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM vehicles WHERE refParking IN(SELECT position FROM parkings AS p JOIN users AS u ON p.refValet = u.id WHERE u.id = ?)";
    db.all(sql, [idParcheggiatore], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const veicoli = rows.map((v) => ({
        id: v.id,
        type: v.type,
        categoryr: v.category,
        refParking: v.refParking,
        position: v.position,
        state: v.state,
      }));
      resolve(veicoli);
    });
  });
};
