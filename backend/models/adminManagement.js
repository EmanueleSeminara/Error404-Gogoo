const db = require("../db/db");

exports.listUsersByRole = (role) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE role = ?";
    db.all(sql, [role], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const utenti = rows.map((u) => ({
        id: u.id,
        name: u.name,
        surname: u.surname,
        email: u.email,
      }));
      resolve(utenti);
    });
  });
};

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

exports.listUsers = (role, name, surname) => {
  console.log(role, name, surname);
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

exports.updateUser = (user) => {
  console.log("MODIFICHE: " + user);
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

exports.createUser = (user) => {
  console.log(user);
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users(name, surname, email, password, phone, birthdate, role) VALUES(?, ?, ?, ?, ?, DATE(?) ?)";
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

exports.getReservations = (email) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT reservations.id, reservations.dateR, reservations.dateC, reservations.refVehicle, vehicles.type, vehicles.category, reservations.refParkingR, reservations.refParkingR, reservations.positionC, reservations.positionC FROM users JOIN reservations ON users.id = reservations.refGuest JOIN vehicles ON reservations.refVehicle = vehicles.id WHERE users.email = ?";
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
        positionC: r.positionC
      }));
      resolve(res);
    });
  });
};

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