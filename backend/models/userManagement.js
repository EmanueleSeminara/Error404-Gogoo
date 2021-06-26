const db = require("../db/db");
const bcrypt = require("bcrypt");

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

  exports.createGuest = (user) => {
    console.log(user)
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO users(name, surname, email, password, phone, birthdate) VALUES(?, ?, ?, ?, ?, DATE(?))";
      db.run(
        sql,
        [
          user.name,
          user.surname,
          user.email,
          user.password,
          user.phone,
          user.birthdate
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

  exports.forgotPassword = (email, randomPassword) => {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE users SET password = ? WHERE email = ? AND EXISTS( SELECT 1 FROM users WHERE email = ?)";
      db.run(sql, [randomPassword, email, email], function (err) {
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