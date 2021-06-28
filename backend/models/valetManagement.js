const db = require("../db/db");

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
        state: reservation.state
      }));
      resolve(reservations);
    });
  });
};

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

exports.deliveryvehicle = (reservation) => {
  return new Promise((resolve, reject) => {
    date = new Date();
    const dateNow =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
    console.log("Data e ora attuale: " + dateNow);
    const sql =
      "UPDATE vehicles AS v SET state ='in use' WHERE v.id = ? AND EXISTS ( SELECT 1 FROM reservations AS r JOIN parkings AS p ON r.refParkingR=p.position WHERE r.refVehicle = ? AND r.dateR<= ? AND p.refValet = ?)";
    db.run(
      sql,
      [
        reservation.refVehicle,
        reservation.refVehicle,
        dateNow,
        reservation.idValet,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        //resolve(this.lastID);
        const sql2 =
          "UPDATE reservations AS r SET state = 'withdrawn' WHERE r.id = ? AND EXISTS SELECT 1 FROM reservations AS r JOIN parkings AS p ON r.refParkingR=p.position WHERE r.refVehicle = ? AND r.dateR<= ? AND p.refValet = ?)";
        db.run(
          sql2,
          [
            reservation.id,
            reservation.refVehicle,
            dateNow,
            reservation.idValet,
          ],
          function (err) {
            if (err) {
              reject(err);
              return;
            }
            resolve(this.lastID);
          }
        );
      }
    );
  });
};

exports.retirevehicle = (reservation) => {
  console.log("RESERVATION: " + reservation);
  return new Promise((resolve, reject) => {
    date = new Date();
    const dateNow =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
    const sql =
      "DELETE FROM reservations AS r WHERE r.id = ? AND EXISTS (SELECT 1 FROM reservations AS r JOIN parkings AS p ON r.refParkingC=p.position WHERE r.refVehicle = ? AND r.dateC>= ? AND p.refValet = ?)";
    db.run(
      sql,
      [
        reservation.refVehicle,
        reservation.refVehicle,
        dateNow,
        reservation.idValet,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
        // const sql2 =
        //   "DELETE FROM reservations AS r WHERE r.id = ? AND EXISTS (SELECT 1 FROM reservations AS r JOIN parkings AS p ON r.refParkingR=p.position WHERE r.refVehicle = ? AND r.dateC>= ? AND p.refValet = ?)";
        // db.run(
        //   sql2,
        //   [
        //     reservation.id,
        //     reservation.refVehicle,
        //     dateNow,
        //     reservation.idValet,
        //   ],
        //   function (err) {
        //     if (err) {
        //       reject(err);
        //       return;
        //     }
        //     resolve(this.lastID);
        //   }
        // );
      }
    );
  });
};