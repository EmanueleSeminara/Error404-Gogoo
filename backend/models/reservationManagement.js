const db = require("../db/db");

exports.deleteReservationById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM reservations WHERE id = ?";
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
        return;
      } else resolve(null);
    });
  });
};

//  5.2 PRENOTAZIONI EFFETTUATE: (ADMIN)

// get elenco prenotazioni by name, surname, type, date in questo formato '2021-06-19 00:00'-'2021-06-19 23:59'

exports.listReservations = (name, surname, type, dateS, dateE) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT users.name, users.surname, reservations.id, reservations.dateR, reservations.dateC FROM users JOIN reservations ON users.id = reservations.refGuest JOIN vehicles ON reservations.refVehicles = vehicles.id WHERE vehicles.type = ? AND users.name = ? AND users.surname= ? AND ((dateR >= ? AND dateR <= ?) OR (dateC >= ? AND dateC <= ?))";
    db.all(
      sql,
      [type, name, surname, dateS, dateE, dateS, dateE],
      (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const res = rows.map((r) => ({
          name: r.name,
          surname: r.surname,
          id: r.id,
          dateR: r.dateR,
          dateC: r.dateC,
        }));
        resolve(res);
      }
    );
  });
};

exports.listReservations = (idV) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM reservations WHERE refVehicle = ?";
    db.all(sql, [idV], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const res = rows.map((r) => ({
        id: r.id,
        refGuest: r.refGuest,
        dateR: r.dateR,
        dateC: r.dateC,
      }));
      resolve(res);
    });
  });
};

//  5.3 MODIFICA PRENOTAZIONE:

// get dati prenotazione by id

exports.getReservationDataById = (idP) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM reservations WHERE id=?";
    db.get(sql, [idP], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: "Reservation not found." });
      } else {
        const reservation = {
          id: reservation.id,
          dateR: reservation.dateR,
          dateC: reservation.dateC,
          refParkingR: reservation.refParkingR,
          refParkingC: reservation.refParkingC,
        };
        resolve(reservation);
      }
    });
  });
};

exports.retireVehicle = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE vehicles SET state = "in use" WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// verifica possibilità di modifica ed eventualmente modifica

// update an existing reservation
exports.updateReservation = (reservation) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE reservations as R SET dateR = ?, dateC= ?, refParkingR = ?, refParkingC = ? WHERE id = ? AND NOT EXISTS (SELECT 1 FROM reservations AS R1 WHERE R1.refVehicles =? AND id != ?)";
    db.run(
      sql,
      [
        reservation.dateR,
        reservation.dateC,
        reservation.refParkingR,
        reservation.refParkingC,
        reservation.id,
        reservation.refVehicles,
        reservation.id,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};

//  5.4 VISUALIZZA MIE PRENOTAZIONI: (GUEST)

// get reservations by userId
exports.reservationList = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM reservations WHERE refGuest = ?";
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const reservations = rows.map((r) => ({
        id: r.id,
        refVehicles: r.refVehicles,
      }));
      resolve(vehicles);
    });
  });
};

exports.deliveryVehicle = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE vehicles SET state = "avalaible" WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

exports.vehicleBreakdown = (id, posizione) => {
  return new Promise((resolve, reject) => {
    const sql =
      'UPDATE vehicles SET state = "damage", position = ? WHERE id = ?';
    db.run(sql, [posizione, id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

exports.getVehicleWithoutReservation = (type, category, position) => {
  return new Promise((resolve, reject) => {
    const sql =
      'SELECT * FROM vehicles WHERE type = ? AND category = ? AND position = ? AND state = "disponibile" AND id NOT IN(SELECT refVehicles FROM reservations)';
    db.all(sql, [type, category, position], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: "Vehicle not found." });
      } else {
        const vehicles = rows.map({
          id: vehicles.id,
          position: vehicles.position,
        });
        resolve(v);
      }
    });
  });
};

exports.updateVehicleInReservations = (idV, newIdV) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE reservations SET refVehicles = ? WHERE refVehicles = ?";
    db.run(sql, [newIdV, idV], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID); //dovrei capire a che cazzo serve
    });
  });
};

exports.addReservation = (reservation, userId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO reservations(refGuest, refVehicle, dateR, dateC, refParkingR, refParkingC) VALUES(?,?,?,?,?,?)";
    db.run(
      sql,
      [
        userId,
        reservation.refVehicle,
        reservation.dateR,
        reservation.dateC,
        reservation.refParkingR,
        reservation.refParkingC,
      ],
      (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};
