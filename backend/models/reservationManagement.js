const db = require("../db/db");

// Elimina la prenotazione associata all'id passto come parametro
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

// Restituisce la prenotazione associata all'id passato come parametro
exports.getReservationById = (idP) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.id, r.dateR, r.dateC, r.refParkingR, r.refParkingC, r.refGuest, r.refDriver, r.refVehicle, r.state, pr.refValet AS refValetR, pc.refValet AS refValetC  FROM (reservations AS r JOIN parkings AS pr ON pr.position = r.refParkingR )JOIN parkings AS pc ON pc.position = r.refParkingC WHERE r.id = ?";
    db.get(sql, [idP], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: "Reservation not found." });
      } else {
        const reservation = {
          id: row.id,
          dateR: row.dateR,
          dateC: row.dateC,
          refParkingR: row.refParkingR,
          refParkingC: row.refParkingC,
          refGuest: row.refGuest,
          refVehicle: row.refVehicle,
          state: row.state,
          refValetR: row.refValetR,
          refValetC: row.refValetC,
          refDriver: row.refDriver,
        };
        resolve(reservation);
      }
    });
  });
};

// Aggiorna la prenotazione corrispondente con le nuove informazioni passate come parametro
exports.updateReservation = (reservation) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE reservations as R SET dateR = ?, dateC= ?, refParkingR = ?, refParkingC = ? WHERE id = ? AND NOT EXISTS (SELECT 1 FROM reservations AS R1 WHERE R1.refVehicle =? AND id != ?)";
    db.run(
      sql,
      [
        reservation.dateR,
        reservation.dateC,
        reservation.refParkingR,
        reservation.refParkingC,
        reservation.id,
        reservation.refVehicle,
        reservation.id,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes);
      }
    );
  });
};

// Restituisce tutte le prenotazioni associate al cliente con id passato come parametro
exports.getMyReservations = (userId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.id,r.refVehicle, v.type, v.category, r.dateR, r.dateC, r.refParkingR, r.refParkingC, r.refDriver, r.positionR, r.positionC, r.state FROM reservations AS r JOIN vehicles AS v ON r.refVehicle= v.id WHERE r.refGuest = ? AND r.state != 'late delivery'";
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const reservations = rows.map((r) => ({
        id: r.id,
        refVehicle: r.refVehicle,
        type: r.type,
        category: r.category,
        dateR: r.dateR,
        dateC: r.dateC,
        refParkingR: r.refParkingR,
        refParkingC: r.refParkingC,
        refDriver: r.refDriver,
        positionR: r.positionR,
        positionC: r.positionC,
        state: r.state,
      }));
      resolve(reservations);
    });
  });
};

// Restituisce tutte le prenotazioni non ritirare dall'utente con id passato come parametro
exports.getMyReservationsNotWithdrawn = (userId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.id,r.refVehicle, v.type, v.category, r.dateR, r.dateC, r.refParkingR, r.refParkingC, r.refDriver, r.positionR, r.positionC, r.state FROM reservations AS r JOIN vehicles AS v ON r.refVehicle= v.id WHERE r.refGuest = ? AND r.state != 'withdrawn'";
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const reservations = rows.map((r) => ({
        id: r.id,
        refVehicle: r.refVehicle,
        type: r.type,
        category: r.category,
        dateR: r.dateR,
        dateC: r.dateC,
        refParkingR: r.refParkingR,
        refParkingC: r.refParkingC,
        refDriver: r.refDriver,
        positionR: r.positionR,
        positionC: r.positionC,
        state: r.state,
      }));
      resolve(reservations);
    });
  });
};

// Imposta lo stato del veicolo associato all'id passato come parametro a danneggiato e inserisce la posizione in cui è stato lasciato dal cliente
exports.damagedVehicle = (id, posizione) => {
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

// Aggiunge una nuova prenotazione al cliente associato all'id passato come parametro
exports.addReservation = (reservation, userId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO reservations(refGuest, refVehicle, dateR, dateC, refParkingR, refParkingC, positionR, positionC) VALUES(?,?,?,?,?,?,?,?)";
    db.run(
      sql,
      [
        userId,
        reservation.refVehicle,
        reservation.dateR,
        reservation.dateC,
        reservation.refParkingR,
        reservation.refParkingC,
        reservation.positionR,
        reservation.positionC,
      ],
      (err) => {
        if (err) {
          reject(err);
          return;
        }
        const sql2 =
          "SELECT * FROM reservations WHERE ROWID=last_insert_rowid()";
        db.get(sql2, [], (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row.id);
        });
      }
    );
  });
};

// Aggiunge una nuova prenotazione con autista con stato non confermato poichè in attesa di presa in carica da parte di un autista
exports.addReservationWithDriver = (reservation, userId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO reservations(refGuest, refVehicle, dateR, dateC, refParkingR, refParkingC, positionR, positionC, state) VALUES(?,?,?,?,?,?,?,?, 'not confirmed')";
    db.run(
      sql,
      [
        userId,
        reservation.refVehicle,
        reservation.dateR,
        reservation.dateC,
        reservation.refParkingR,
        reservation.refParkingC,
        reservation.positionR,
        reservation.positionC,
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

// Modifica il veicolo associato alla prenotazione a tutte le prenotazioni che contengono idOldVehcile
exports.updateVehicleInReservation = (idOldVehicle, idNewVehicle) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE reservations SET refVehicle = ? WHERE refVehicle = ?";
    db.run(sql, [idNewVehicle, idOldVehicle], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// Modifica lo stato della prenotazione a ritardo consegna e restituisce true se esiste la prenotazione, false altrimenti
exports.isInReservations = (idGuest, idReservation) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE reservations SET state='late delivery' WHERE id = ? AND refGuest= ?";
    db.run(sql, [idReservation, idGuest], function (err, row) {
      if (err) {
        reject(err);
        return;
      }
      this.changes === 1 ? resolve(true) : resolve(false);
    });
  });
};

// Restituisce true se non è possibile modificare la prenotazion, false altrimenti
exports.canTEditReservation = (refVehicle, id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT id FROM reservations as r WHERE r.refVehicle = ? AND r.id != ?";
    db.get(sql, [refVehicle, id], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row ? true : false);
    });
  });
};

// Modifica i parcheggi di partenza e destinazione alla prenotazione
exports.changeParking = (reservation) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE reservations SET refParkingR = ? AND refParkingC = ? WHERE id = ?";
    db.run(
      sql,
      [reservation.refParkingR, reservation.refParkingC, reservation.id],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        this.changes === 1 ? resolve(true) : resolve(false);
      }
    );
  });
};

// Modifica lo stato della prenotazione corrispondente all'id passato come parametro
exports.changeState = (reservation) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE reservations SET state = ? WHERE id = ?";
    db.run(sql, [reservation.state, reservation.id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      this.changes === 1 ? resolve(true) : resolve(false);
    });
  });
};

// Modifica la data di ritiro e consegna alla prenotazioen con id passto come parametro
exports.changeDate = (reservation) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE reservations SET dateR = ?, dateC= ? WHERE id = ?";
    db.run(
      sql,
      [reservation.dateR, reservation.dateC, reservation.id],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes);
      }
    );
  });
};

exports.getConfirmedReservations = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM reservations  WHERE state = 'confirmed'";
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const reservations = rows.map((r) => ({
        id: r.id,
        dateC: r.dateC,
      }));
      resolve(reservations);
    });
  });
};
