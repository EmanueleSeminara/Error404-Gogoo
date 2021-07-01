const db = require("../db/db");

// Crea un nuovo veicolo
exports.createVehicle = (vehicle) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO vehicles(type, category, refParking, position) VALUES(?, ?, ?, ?)";
    db.run(
      sql,
      [
        vehicle.type,
        vehicle.category !== "" ? vehicle.category : "NULL",
        vehicle.refParking,
        vehicle.position,
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

// Restituisce l'elenco dei veicolo per tipo
exports.listVehicle = (tipologia) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM vehicles WHERE type = ?";
    db.all(sql, [tipologia], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const vehicles = rows.map((v) => ({
        id: v.id,
        category: v.category,
        refParking: v.refParking,
        position: v.position,
        state: v.state,
      }));
      resolve(vehicles);
    });
  });
};

// Elimina il veicolo associato all'id passato come parametro
exports.deleteVehiclesById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM vehicles WHERE id = ?";
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
        return;
      } else resolve(null);
    });
  });
};

// Aggiorna lo stato e il parcheggio in cui si trova al veicolo passato come parametro
exports.updateVehicle = (vehicle) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE vehicles SET refParking = ?, state = ? WHERE id = ?";
    db.run(
      sql,
      [vehicle.refParking, vehicle.state, vehicle.id],
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

// Restituisce un veicolo con tipo, categoria e parcheggio passati come parametri che non abbia nessuna prenotazione
exports.getSimilarVehicle = (refParking, type, category) => {
  return new Promise((resolve, reject) => {
    let sql = "";
    if (category) {
      sql =
        "SELECT v.id FROM vehicles AS v WHERE v.refParking = ? AND v.state != 'damage' AND v.type = ? AND v.category = ? AND v.id NOT IN(SELECT refVehicle FROM reservations) LIMIT 1";
      db.get(sql, [refParking, type, category], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row);
      });
    } else {
      sql =
        "SELECT v.id FROM vehicles AS v WHERE v.refParking = ? AND v.state != 'damage' AND v.type = ? AND v.id NOT IN(SELECT refVehicle FROM reservations) LIMIT 1";
      db.get(sql, [refParking, type], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row);
      });
    }
  });
};

// Aggiorna lo stato a quello passato come parametro al veicolo associato all'id passato come parametro
exports.updateState = (id, state) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE vehicles SET state = ? WHERE id = ?";
    db.run(sql, [state, id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.changes);
    });
  });
};

// Restituisce tutti i veicoli con il tipo passato come parametro con eventuale prenotazione associata
exports.getVehiclesAndReservation = (type) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT v.id, v.type, v.category, r.id AS idReservation, r.dateR, r.dateC FROM vehicles AS v LEFT JOIN reservations AS r ON v.id=r.refVehicle WHERE v.type = ? AND v.state != 'damage' AND refParking != 'NULL' ORDER BY v.id";
    db.all(sql, [type], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

// Modifica il parcheggio al veicolo associato all'id passto come parametro
exports.changeRefParking = (refParking, id) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE vehicles SET refParking = ? WHERE id = ?";
    db.run(sql, [refParking, id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      this.changes === 1 ? resolve(true) : resolve(false);
    });
  });
};
