"use strict";
// Moduli importati
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config({ path: "./.env" });

const initializePassport = require("./models/passport-config");
initializePassport(passport);

const BASEURL = "/api";

const reservationManagement = require("./models/reservationManagement");

// Routes importate
const usersRoutes = require("./routes/user");
const adminsRoutes = require("./routes/admin");
const guestsRoutes = require("./routes/guest");
const vehiclesRoutes = require("./routes/vehicle");
const searchRoutes = require("./routes/search");
const reservationRoutes = require("./routes/reservation");
const driverRoutes = require("./routes/driver");
const valetRoutes = require("./routes/valet");

// init express
const app = express();
const port = 3001;

// set-up the middlewares
app.use(morgan("dev"));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// init passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(BASEURL + "/user/", usersRoutes);
app.use(BASEURL + "/admin/", adminsRoutes);
app.use(BASEURL + "/guest/", guestsRoutes);
app.use(BASEURL + "/vehicle/", vehiclesRoutes);
app.use(BASEURL + "/search/", searchRoutes);
app.use(BASEURL + "/reservation/", reservationRoutes);
app.use(BASEURL + "/driver/", driverRoutes);
app.use(BASEURL + "/valet/", valetRoutes);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

// Active the server//
app.listen(port, () => {
  console.log("App listening on port " + port);
  setInterval(() => {
    console.log("Deleting expired reservations...");
    const dateNow = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" })
    );
    const reservations = reservationManagement.getConfirmedReservations();
    reservations.forEach((reservation) => {
      if (
        new Date(new Date(reservation.dateC).getTime() + 86400000) < dateNow
      ) {
        reservationManagement.deleteReservationById(reservation.id);
      }
    });
    console.log("Expired reservations deleted!");
  }, 86400000);
});
