//3. GESTIONE ACCOUNT

"use strict";

const db = require("../db/db");
const bcrypt = require("bcrypt");

//  3.1 RECUPERO PASSWORD:

// forgot password
exports.forgotPassword = (email, randomPassword) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE users SET password = ? WHERE email = ? AND EXISTS( SELECT 1 FROM users WHERE email = ?)";
    db.run(sql, [randomPassword, email, email], function (err) {
      //console.log(this.changes)
      if (err) {
        reject(err);
        return;
      }
      else if(this.changes === 0){
        reject(true);
      }
      else{
        resolve(this.changes);
      }
    });
  });
};

//  3.2 MODIFICA PASSWORD:

// Update password
exports.updatePassword = (userId, newPassword) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET password = ? WHERE id=?";
    db.run(sql, [newPassword, userId], function (err, row) {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
};

//  3.3 REGISTRAZIONE CLIENTE: (OPERATORE TERNARIO, VERSIONE ZIFRO)

// // add a new user
// exports.createUser = (user) => {
//   return new Promise((resolve, reject) => {
//     const sql =
//       "INSERT INTO users(name, surname, email, password, phone, birthdate, role) VALUES(?, ?, ?, ?, ?, DATE(?), ?)";
//     db.run(
//       sql,
//       [
//         user.name,
//         user.surname,
//         user.email,
//         user.password,
//         user.phone,
//         user.birthdate,
//         user.role ? user.role : "guest",
//       ],
//       function (err) {
//         if (err) {
//           reject(err);
//           return;
//         }
//         resolve(this.lastID);
//       }
//     );
//   });
// };

//  3.4 AUTENTICAZIONE: (FATTO, VEDI POLITO)

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) resolve({ error: "User not found." });
      else {
        // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
        const user = {
          id: row.id,
          email: row.email,
          name: row.name,
          surname: row.surname,
          phone: row.phone,
          birthdate: row.birthdate,
          role: row.role,
        };
        resolve(user);
      }
    });
  });
};

exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [email], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) {
        resolve(false);
      } else {
        const user = {
          id: row.id,
          email: row.email,
          name: row.name,
          surname: row.surname,
          phone: row.phone,
          age: row.age,
          role: row.role,
        };

        // check the hashes with an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
        bcrypt.compare(password, row.password).then((result) => {
          if (result) resolve(user);
          else resolve(false);
        });
      }
    });
  });
};

//  3.6 FUNZIONALITA' CLIENTE:

//      3.6.1 MODIFICA DATI PERSONALI:

//get dati cliente
exports.getGuestData = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [userId], function (err, row) {
      if (err) {
        reject(err);
        return;
      }
      else if (row === undefined) {
        resolve(false);
      } else {
        const user = {
          email: row.email,
          name: row.name,
          surname: row.surname,
          phone: row.phone,
          birthdate: row.birthdate
        };
        resolve(user);
      }
    });
  });
};


//      3.6.2 INSERIMENTO PATENTE:

// add a new car-license
exports.createCarLicense = (carlicense) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO licenses(refGuest, number, date, a, am, a1, a2, b) VALUES(?, ?, DATE(?), ?, ?, ?, ?, ?)";
    db.run(sql, [carlicense.refGuest, carlicense.number, carlicense.date, carlicense.a, carlicense.am, carlicense.a1, carlicense.a2, carlicense.b], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

exports.getCarLicenseData = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM licenses WHERE refGuest = ?";
    db.get(sql, [userId], function (err, row) {
      if (err) {
        reject(err);
        return;
      }
      else if (row === undefined) {
        resolve(false);
      } else {
        const license = {
          number: row.number,
          date: row.date,
          a: row.a,
          am: row.am,
          a1: row.a1,
          a2: row.a2,
          b: row.b
        };
        resolve(license);
      }
    });
  });
};

//      3.6.3 AGGIORNA PATENTE:

//update car-license
exports.updateCarLicense = (license) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE licenses SET number = ?, date = DATE(?), a = ?, am = ?, a1 = ?, a2 = ?, b = ? WHERE refGuest = ?";
    db.run(
      sql,
      [
        license.number,
        license.date,
        license.a,
        license.am,
        license.a1,
        license.a2,
        license.b,
        license.refGuest
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

//      3.6.4 ELIMINAZIONE METODO PAGAMENTO:

// get all payments identified by {userId}
exports.listPayments = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM payments WHERE refGuest = ?";
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const pays = rows.map((p) => ({
        id: p.id,
        number: p.number,
        name: p.name,
        surname: p.surname,
      }));
      resolve(pays);
    });
  });
};

// delete an existing PaymentMethod
exports.deletePaymentMethodById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM payments WHERE id = ?";
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
        return;
      } else resolve(null);
    });
  });
};

//      3.6.5 INSERIMENTO METODO PAGAMENTO:

// add a new paymentMethod
exports.createPaymentMethod = (userId, paymentMethod) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO payments(refGuest, number, date, cvv, name, surname) VALUES(?, ?, DATE(?), ?, ?, ?)";
    db.run(
      sql,
      [
        userId,
        paymentMethod.number,
        paymentMethod.date,
        paymentMethod.cvv,
        paymentMethod.name,
        paymentMethod.surname,
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
