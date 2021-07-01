const db = require("../db/db");

// Aggiorna le impostazioni personali del cliente associato all'id passato come parametro
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

// Restituisce le informazioni del cliente associato all'id passato come parametro
exports.getGuestData = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [userId], function (err, row) {
      if (err) {
        reject(err);
        return;
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = {
          email: row.email,
          name: row.name,
          surname: row.surname,
          phone: row.phone,
          birthdate: row.birthdate,
        };
        resolve(user);
      }
    });
  });
};

// Aggiunge una nuova patente associata al cliente refGuest
exports.createCarLicense = (carlicense) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO licenses(refGuest, number, date, a, am, a1, a2, b) VALUES(?, ?, DATE(?), ?, ?, ?, ?, ?)";
    db.run(
      sql,
      [
        carlicense.refGuest,
        carlicense.number,
        carlicense.date,
        carlicense.a,
        carlicense.am,
        carlicense.a1,
        carlicense.a2,
        carlicense.b,
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

// Restituisce la patente del cliente associato all'id passato come parametro
exports.getCarLicenseData = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM licenses WHERE refGuest = ?";
    db.get(sql, [userId], function (err, row) {
      if (err) {
        reject(err);
        return;
      } else if (row === undefined) {
        resolve(false);
      } else {
        const license = {
          number: row.number,
          date: row.date,
          a: row.a,
          am: row.am,
          a1: row.a1,
          a2: row.a2,
          b: row.b,
        };
        resolve(license);
      }
    });
  });
};

// Aggiorna i dati della patente del cliente associato a refGuest
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
        license.refGuest,
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

// Elimina il metodo di apgamento associato all'id pasato come parametro
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

// Aggiunge un nuovo metodo di pagamento al cliente associato a userId passato come parametro
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

// Restituisce tutti i metodi di pagamento del cliente associato a userId passato come parametro
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

// Aggiorna lo stato del veicolo a danneggiato e inserisce la posizione in cui è stato lasciato
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

// Aggiorna la posizione e lo stato del veicolo e elimina la prenotazione a seguito della consegna fuori stallo
exports.deliveryOutOfStall = (reservation) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE vehicles SET position = ?, state = 'available' WHERE id = ? AND EXISTS (SELECT 1 FROM reservations AS r WHERE refGuest=? AND refVehicle = ? AND id = ?)";
    db.run(
      sql,
      [
        reservation.position,
        reservation.refVehicle,
        reservation.refGuest,
        reservation.refVehicle,
        reservation.id,
      ],
      (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const sql2 =
          "DELETE FROM reservations WHERE id = ? AND  EXISTS (SELECT 1 FROM reservations AS r WHERE refGuest=? AND refVehicle = ? AND id = ?)";
        db.run(
          sql2,
          [
            reservation.id,
            reservation.refGuest,
            reservation.refVehicle,
            reservation.id,
          ],
          (err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(true);
          }
        );
      }
    );
  });
};

// Verifica se il veicolo associato alla prenotazione può essere consegnato fuori stallo
exports.canDeliverOutOfStall = (reservation) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT refVehicle FROM reservations as r WHERE r.refVehicle = ? AND r.id = ? AND refVehicle NOT IN(SELECT refVehicle FROM reservations as r1 WHERE r1.refVehicle = ? AND r.id != r1.id)";
    db.get(
      sql,
      [reservation.refVehicle, reservation.id, reservation.refVehicle],
      (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row ? true : false);
      }
    );
  });
};

// Restituisce tutte le prenotazione nello stato di ritardo consegna del cliente associato all'id passato come parametro
exports.getMyReservationsLateDelivery = (userId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT r.id,r.refVehicle, v.type, v.category, r.dateR, r.dateC, r.refParkingR, r.refParkingC, r.refDriver, r.positionR, r.positionC, r.state FROM reservations AS r JOIN vehicles AS v ON r.refVehicle= v.id WHERE r.refGuest = ? AND r.state = 'late delivery'";
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
