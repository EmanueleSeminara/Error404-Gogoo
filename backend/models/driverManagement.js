const db = require("../db/db");

// Restituisce tutte le prenotazioni prese in carico dall'autista associa all'id passato come parametro
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

// Restituisce tutte le prenotazioni ancora non confermate da nessun autista
exports.reservationNotConfirmed = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.id,r.refVehicle, v.type, v.category, r.dateR, r.dateC, r.refParkingR, r.refParkingC, r.positionR, r.positionC, u.name, u.surname FROM reservations AS r JOIN vehicles AS v ON r.refVehicle= v.id JOIN users AS u ON u.id = r.refGuest WHERE r.state = 'not confirmed'";
    db.all(sql, [], (err, rows) => {
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

// Conferma la prenotazione associata ad idReservation e inserisce idDriver come autista alla stessa
exports.confirmationOfReservation = (idDriver, idReservation) => {
  console.log("PRENOTAZIONE DA CONFERMARE: " + idDriver, idReservation);
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE reservations SET refDriver = ?, state = 'confirmed' WHERE state = 'not confirmed' AND id = ?";
    db.run(sql, [idDriver, idReservation], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// Restituisce il cliente associato alla prenotazione corrispondente all'id passato come parametro
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
        name: row.name,
      };
      resolve(user);
    });
  });
};
