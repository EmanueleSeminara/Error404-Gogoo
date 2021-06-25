"use strict";
// Imported modules
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config({ path: "./.env" });

const initializePassport = require('./models/passport-config');
initializePassport(passport);


const BASEURL = "/api";

// Imported routes
const usersRoutes = require("./routes/user");
const adminsRoutes = require("./routes/admin");
const guestsRoutes = require("./routes/guest");
const vehiclesRoutes = require("./routes/vehicle");
const searchRoutes = require("./routes/search");


// init express
const app = express();
const port = 3001;

// set-up the middlewares
app.use(morgan("dev"));
app.use(express.json());


app.use(
  session({
      // by default, Passport uses a MemoryStore to keep track of the sessions
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
  })
);

// then, init passport
app.use(passport.initialize());
app.use(passport.session());



// Routes

app.use(BASEURL + "/user/", usersRoutes);
app.use(BASEURL + "/admin/", adminsRoutes);
app.use(BASEURL + "/guest/", guestsRoutes);
app.use(BASEURL + "/vehicle/", vehiclesRoutes);
app.use(BASEURL + "/search/", searchRoutes);



app.get("/", (req, res) => {
  res.send("CIAO");
  console.log(req.isAuthenticated());
});

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

// Active the server//
app.listen(port, () => console.log('App listening on port ' + port));
