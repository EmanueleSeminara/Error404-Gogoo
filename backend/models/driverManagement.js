const db = require("../db/db");

// Restituisce tutte le prenotazioni dell'autista
exports.myReservation = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.id,r.refVehicle, v.type, v.category, r.dateR, r.dateC, r.refParkingR, r.refParkingC, r.positionR, r.positionC, r.state, u.name, u.surname FROM reservations AS r JOIN vehicles AS v ON r.refVehicle= v.id JOIN users AS u ON u.id = r.refGuest WHERE r.refDriver = ?";
    db.all(sql, [id], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const reservations = rows.map((reservation) => ({
        id: reservation.id,
        refVehicle: reservation.refVehicle,
        type: reservation.type,
        category: reservation.category,
        dateR: reservation.dateR,
        dateC: reservation.dateC,
        refParkingR: reservation.refParkingR,
        refParkingC: reservation.refParkingC,
        positionR: reservation.positionR,
        positionC: reservation.positionC,
        state: reservation.state,
        name: reservation.name,
        surname: reservation.surname,
      }));
      resolve(reservations);
    });
  });
};

exports.reservationNotConfirmed = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.id,r.refVehicle, v.type, v.category, r.dateR, r.dateC, r.refParkingR, r.refParkingC, r.positionR, r.positionC, u.name, u.surname FROM reservations AS r JOIN vehicles AS v ON r.refVehicle= v.id JOIN users AS u ON u.id = r.refGuest WHERE r.state = 'not  confirmed'";
    db.all(sql, [id], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const reservations = rows.map((reservation) => ({
        id: reservation.id,
        refVehicle: reservation.refVehicle,
        type: reservation.type,
        category: reservation.category,
        dateR: reservation.dateR,
        dateC: reservation.dateC,
        refParkingR: reservation.refParkingR,
        refParkingC: reservation.refParkingC,
        positionR: reservation.positionR,
        positionC: reservation.positionC,
        name: reservation.name,
        surname: reservation.surname,
      }));
      resolve(reservations);
    });
  });
};

exports.retireCar = (reservation) => {
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
      "UPDATE vehicles AS v SET state ='in use' WHERE v.id = ? AND EXISTS ( SELECT 1 FROM reservations AS r WHERE refVehicle = ? AND dateR<= ? AND refDriver = ?)";
    db.run(
      sql,
      [
        reservation.refVehicle,
        reservation.refVehicle,
        dateNow,
        reservation.refDriver,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        //resolve(this.lastID);
        const sql2 =
          "UPDATE reservations AS r SET state = 'withdrawn' WHERE r.id = ? AND EXISTS ( SELECT 1 FROM reservations AS r WHERE refVehicle = ? AND dateR<= ? AND refDriver = ?)";
        db.run(
          sql2,
          [
            reservation.id,
            reservation.refVehicle,
            dateNow,
            reservation.refDriver,
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

exports.carDelivery = (reservation) => {
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
      "UPDATE vehicles AS v SET state ='available' WHERE v.id = ? AND EXISTS ( SELECT 1 FROM reservations AS r WHERE refVehicle = ? AND dateR>= ? AND refDriver = ?)";
    db.run(
      sql,
      [
        reservation.refVehicle,
        reservation.refVehicle,
        dateNow,
        reservation.refDriver,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        //resolve(this.lastID);
        const sql2 =
          "DELETE FROM reservations AS r WHERE r.id = ? AND EXISTS ( SELECT 1 FROM reservations AS r WHERE refVehicle = ? AND dateR>= ? AND refDriver = ?)";
        db.run(
          sql2,
          [
            reservation.id,
            reservation.refVehicle,
            dateNow,
            reservation.refDriver,
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

// Conferma la prenotazion
exports.confirmationOfReservation = (idDriver, idReservation) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE reservations AS r SET idDriver = ? WHERE r.state = 'not confirmed' AND r.id = ?";
    db.run(sql, [idDriver, idReservation], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};


exports.getUserByReservation = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT u.name, u.email FROM users AS u JOIN reservations AS r ON u.id = r.refGuest WHERE r.id  = ?";
    db.get(sql, [id], function (err, row) {
      if (err) {
        reject(err);
        return;
      }
      const user = {
        email: row.email,
        name: row.name
      }
      resolve(user);
    });
  });
};