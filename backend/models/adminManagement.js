const db = require("../db/db");

// Restituisce tutti gli utenti che hanno il ruolo passato come parametro
exports.listUsersByRole = (role) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE role = ?";
    db.all(sql, [role], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const users = rows.map((u) => ({
        id: u.id,
        name: u.name,
        surname: u.surname,
        email: u.email,
      }));
      resolve(users);
    });
  });
};

// Elimina l'utente associato all'id passato come parametro
exports.deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM users WHERE id = ?";
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
        return;
      } else resolve(null);
    });
  });
};

// Restituisce la lista degli utenti che hanno  ruolo, nome e cognome passati come parametro
exports.listUsers = (role, name, surname) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM users WHERE role = ? AND name = ? AND surname = ?";
    db.all(sql, [role, name, surname], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const utenti = rows.map((u) => ({
        id: u.id,
        name: u.name,
        surname: u.surname,
        email: u.email,
        phone: u.phone,
        birthdate: u.birthdate,
      }));
      resolve(utenti);
    });
  });
};

// Aggiorna le informazioni ddell'utente associato all'id passato come parametro
exports.updateUser = (user) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE users SET name = ?, surname = ?, email=?, phone=?, password = ?, birthdate = DATE(?) WHERE id=?";
    db.run(
      sql,
      [
        user.name,
        user.surname,
        user.email,
        user.phone,
        user.password,
        user.birthdate,
        user.id,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        } else if (this.changes === 0) {
          reject(true);
        } else {
          resolve(this.changes);
        }
      }
    );
  });
};

// Crea un nuovo utente con le credenzali passte come parametro
exports.createUser = (user) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users(name, surname, email, password, phone, birthdate, role) VALUES(?, ?, ?, ?, ?, DATE(?), ?)";
    db.run(
      sql,
      [
        user.name,
        user.surname,
        user.email,
        user.password,
        user.phone,
        user.birthdate,
        user.role,
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

// Restituisce tutte le prenotazioni fatte dall'utente associato alla email passata come parametro
exports.getReservations = (email) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.id, r.dateR, r.dateC, r.refVehicle, v.type, v.category, r.refParkingR, r.refParkingC, r.positionR, r.positionC FROM users AS u JOIN reservations AS r ON u.id = r.refGuest JOIN vehicles AS v ON r.refVehicle = v.id WHERE u.email = ?";
    db.all(sql, [email], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const res = rows.map((r) => ({
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
      }));
      resolve(res);
    });
  });
};

// Elimina la prenotazione associata all'id passato come parametro
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

// Aggiorna la prenotazione associata all'id passato come parametro se non vi sono altre prenotazioni con quel determinato veicolo
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
        resolve(this.lastID);
      }
    );
  });
};
