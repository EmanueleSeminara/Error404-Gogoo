const sqlite = require("sqlite3");

// Apertura del database
const db = new sqlite.Database("./db/dropcar.sqlite", (err) => {
  if (err) throw err;
});

module.exports = db;
