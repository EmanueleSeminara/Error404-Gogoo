//1. GESTIONE UTENTI

"use strict";

const db = require("../db/db");

//    1.1 RIMUOVI UTENTE:

// get all existing users identified by {role}
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

// delete an existing user
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

//    1.2 AGGIUNGI UTENTE:

// add a new user
exports.createUser = (user) => {
  console.log(user)
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
        user.role ? user.role : "guest",
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

//    1.3 MODIFICA DATI UTENTE:

// get all users identified by {role, name, surname}
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

// update an existing user
exports.updateUser = (user) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE users SET name = ?, surname = ?, email=?, phone=?, birthdate = DATE(?) WHERE id=?";
    db.run(
      sql,
      [
        user.name,
        user.surname,
        user.email,
        user.phone,
        user.birthdate,
        user.id,
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
