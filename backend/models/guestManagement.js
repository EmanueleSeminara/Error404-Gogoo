const db = require("../db/db");

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