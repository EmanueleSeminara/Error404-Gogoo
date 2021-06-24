//6. GESTIONE PRENOTAZIONE:
//  6.1 RITIRO:

// get dati prenotazione by id come sopra
exports.getReservationDataById = (idP) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM reservations WHERE id=?';
      db.get(sql, [idP], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        if (row == undefined) {
          resolve({error: 'Reservation not found.'});
        } else {
          const reservation = { id: reservation.id, dateR: reservation.dateR, dateC: reservation.dateC, refParkingR: reservation.refParkingR, refParkingC: reservation.refParkingC};
          resolve(reservation);
        }
      });
    });
  };
  

// update vehicle state (ritiro)
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

//  6.2 CONSEGNA:

// // get dati prenotazione by id come sopra
// exports.getReservationDataById = (idP) => {
//     return new Promise((resolve, reject) => {
//       const sql = 'SELECT * FROM reservations WHERE id=?';
//       db.get(sql, [idP], (err, row) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         if (row == undefined) {
//           resolve({error: 'Reservation not found.'});
//         } else {
//           const reservation = { id: reservation.id, dateR: reservation.dateR, dateC: reservation.dateC, refParkingR: reservation.refParkingR, refParkingC: reservation.refParkingC};
//           resolve(reservation);
//         }
//       });
//     });
//   };
  

// update vehicle state (consegna) 
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

// delete an existing reservation
exports.deleteReservationById = (idP) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM reservations WHERE id = ?';
        db.run(sql, [idP], (err) => {
            if (err) {
                reject(err);
                return;
            } else
                resolve(null);
        });
    });
}

//  6.3 SEGNALA GUASTO:

// // get dati prenotazione by id come sopra
// exports.getReservationDataById = (idP) => {
//     return new Promise((resolve, reject) => {
//       const sql = 'SELECT * FROM reservations WHERE id=?';
//       db.get(sql, [idP], (err, row) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         if (row == undefined) {
//           resolve({error: 'Reservation not found.'});
//         } else {
//           const reservation = { id: reservation.id, dateR: reservation.dateR, dateC: reservation.dateC, refParkingR: reservation.refParkingR, refParkingC: reservation.refParkingC};
//           resolve(reservation);
//         }
//       });
//     });
//   };  

// update vehicle state (guasto) 
exports.vehicleBreakdown = (id, posizione) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE vehicles SET state = "damage", position = ? WHERE id = ?';
        db.run(sql, [posizione, id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

// // delete an existing reservation come sopra
// exports.deleteReservationById = (idP) => {
//     return new Promise((resolve, reject) => {
//         const sql = 'DELETE FROM reservations WHERE id = ?';
//         db.run(sql, [idP], (err) => {
//             if (err) {
//                 reject(err);
//                 return;
//             } else
//                 resolve(null);
//         });
//     });
// }


// get elenco prenotazioni by refVehicle
exports.listReservations = (idV) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM reservations WHERE refVehicles = ?';
        db.all(sql, [idV], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const res = rows.map((r) => ({id: r.id, refGuest: r.refGuest, dateR: r.dateR, dateC: r.dateC}));
            resolve(res);
        });
    });
};



// ricerca veicoli non prenotati -tipo categoria e parcheggio di destinazione della prenotazione con guasto
exports.getVehicleWithoutReservation = (type, category, position) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM vehicles WHERE type = ? AND category = ? AND position = ? AND state = "disponibile" AND id NOT IN(SELECT refVehicles FROM reservations)';
      db.all(sql, [type, category, position], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        if (row == undefined) {
          resolve({error: 'Vehicle not found.'});
        } else {
          const vehicles = rows.map({ id: vehicles.id, position: vehicles.position});
          resolve(v);
        }
      });
    });
  };


// aggiorna dati prenotazione con veicolo trovato
exports.updateVehicleInReservations = (idV, newIdV) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE reservations SET refVehicles = ? WHERE refVehicles = ?';
        db.run(sql, [newIdV, idV], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID); //dovrei capire a che cazzo serve
        });
    });
};

//  6.4 CONSEGNA FUORI STALLO:

//get dati prenotazione by id scritto sopra (mi pare)

// verifica possibilità di modifica ed eventualmente modifica

// update an existing reservation
exports.updateReservation = (reservation) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE reservations as R SET refParkingC = ? WHERE id = ? AND NOT EXISTS (SELECT 1 FROM reservations AS R1 WHERE R1.refVehicles =? AND id != ?)';
      db.run(sql, [reservation.refParkingC, reservation.id, reservation.refVehicles, reservation.id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  };

//  6.5 RITARDO CONSEGNA: 



//  6.6 MANCATA CONSEGNA: