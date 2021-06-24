//4. RICERCA:
//  4.1 RICERCA VEICOLI: 

// get all available vehicles 
exports.searchVehicles = (type, dateR, dateC, startParking) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM vehicles WHERE type = ? AND position = ? AND id NOT IN(SELECT refVehicles FROM reservations WHERE ((? >= dateR AND ? <= dateC) OR (? >= dateR AND ? <= dateC) OR (? <= dateR AND ? >=dateC) ))';
        db.all(sql, [type, startParking, dateR, dateR, dateC, dateC, dateR, dateC], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const vehicles = rows.map((v) => ({ id: v.id }));
            resolve(vehicles);
        });
    });
};

//  4.2 RICERCA AUTOMOBILI CON AUTISTA:

// // get all available vehicles stesso di sopra
// exports.searchVehicles = (type, dateR, dateC, startParking) => {
//     return new Promise((resolve, reject) => {
//         const sql = 'SELECT * FROM vehicles WHERE type = ? AND position = ? AND id NOT IN(SELECT refVehicles FROM reservations WHERE ((? >= dateR AND ? <= dateC) OR (? >= dateR AND ? <= dateC) OR (? <= dateR AND ? >=dateC) ))';
//         db.all(sql, [type, startParking, dateR, dateR, dateC, dateC, dateR, dateC], (err, rows) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             const vehicles = rows.map((v) => ({ id: v.id}));
//             resolve(vehicles);
//         });
//     });
// };

// get all available drivers
exports.searchDrivers = (dateR, dateC) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE role = "driver" AND id NOT IN(SELECT reservations.refDriver FROM users JOIN reservations ON users.id = reservations.refDriver WHERE ((? >= dateR AND ? <= dateC) OR (? >= dateR AND ? <= dateC) OR (?<= dateR AND  ? >=dateC)))';
        db.all(sql, [dateR, dateR, dateC, dateC, dateR, dateC], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const drivers = rows.map((d) => ({ id: d.id, email: d.email }));
            resolve(drivers);
        });
    });
};


//  4.3 RICERCA AUTOMOBILI FUORI STALLO:

// get all vehicles (in inglese) fuori stallo
exports.searchDrivers = (dateR, dateC) => {
    return new Promise((resolve, reject) => {
        const sql =
            'SELECT * FROM vehicles WHERE state = "fuori stallo" AND type = "car" id NOT IN( SELECT reservations.refVehicles FROM vehicles JOIN reservations ON vehicles.id = reservations.refVehicles WHERE ((? >= dateR AND ? <= dateC) OR (? >= dateR AND ? <= dateC) OR (? <= dateR AND  ? >=dateC)))';
        db.all(sql, [dateR, dateR, dateC, dateC, dateR, dateC], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const vehicles = rows.map((v) => ({ id: v.id, category: v.category, position: v.position }));
            resolve(vehicles);
        });
    });
};