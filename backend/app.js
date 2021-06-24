"use strict";
// Imported modules
const express = require("express");
const morgan = require("morgan");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
var generator = require("generate-password");
require("dotenv").config({ path: "./.env" });
const BASEURL = "/api";

// Imported functions
let accountManagement = require("./models/accountManagement");
let userManagement = require("./models/userManagement");
let vehicleManagement = require("./models/vehicleManagement");
let postReservationManagement = require("./models/postReservationManagement");
let reservationManagement = require("./models/reservationManagement");
let searchManagement = require("./models/searchManagement");
let mail = require("./models/mail");

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(
  new LocalStrategy(function (username, password, done) {
    accountManagement.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, {
          message: "Incorrect username and/or password.",
        });

      return done(null, user);
    });
  })
);

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  //console.log("serializeUser: user:" + JSON.stringify(user));
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  //console.log("deserializeUser: id:" + id);
  accountManagement
    .getUserById(id)
    .then((user) => {
      //console.log("deserializeUser: user da db:" + JSON.stringify(user));
      done(null, user); // this will be available in req.user
    })
    .catch((err) => {
      done(err, null);
    });
});

// init express
const app = express();
const port = 3001;

// set-up the middlewares
app.use(morgan("dev"));
app.use(express.json());

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "not authenticated" });
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role == "admin") return next();

  return res.status(401).json({ error: "not autorized" });
};

// set up the session
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

/* TEST ROTTE */

// LOGIN
app.post(BASEURL + "/user/sessions", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

// REGISTRAZIONE
app.post(
  BASEURL + "/user/register",
  [
    check("email").isEmail(),
    check("name").isAlpha('it-IT', { ignore: ' ' }),
    check("surname").isAlpha('it-IT', { ignore: ' ' }),
    check("birthdate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("phone").isMobilePhone(["it-IT"]),
    check("password").isStrongPassword(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }

    const user = {
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      birthdate: req.body.birthdate,
      phone: req.body.phone,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    };

    try {
      await userManagement.createUser(user);
      mail.sendWelcomeMail(user.email, user.name);
      res.status(201).end();
    } catch (err) {
      //console.log(err.code);
      //console.log(err.errno);
      if (err.errno == 19) {
        res.status(513);
      } else {
        res.status(503);
      }
      res.json({
        error: 'Database error during the creation of user - ' + err,
      });
    }
  }
);

// LOGOUT
app.post(BASEURL + "/user/logout", isLoggedIn, (req, res) => {
  // console.log(req.user);
  req.logout();
  res.end();
});

// MODIFICA PASSWORD
app.put(
  BASEURL + "/user/changepassword",
  isLoggedIn,
  [check("password").isStrongPassword()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      //console.log(req.session);
      const user = await accountManagement.updatePassword(
        req.session.passport.user,
        await bcrypt.hash(req.body.password, 10)
      );
      mail.sendPasswordChangedMail(req.user.email, req.user.name);
      res.status(201).end();
    } catch (err) {
      console.log(err);
      res.status(503).json({
        error: 'Database error during the update of user s password - ' + err,
      });
    }
  }
);

// PASSWORD DIMENTICATA
app.post(
  BASEURL + "/user/forgotpassword",
  [check("email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      var password = generator.generate({
        length: 8,
        numbers: true,
        symbols: true,
      });
      const hashPassword = await bcrypt.hash(password, 10);
      await accountManagement.forgotPassword(
        req.body.email,
        hashPassword
      );
      mail.sendRecoveryPasswordMail(req,user.email, req.user.name, password);
      res.status(201).end();
    } catch (err) {

      if (err) {
        res.status(513).json({ error: 'The email is not associated with any account.' });
      } else {
        res.status(503).json({ error: 'Database error during the creation of user - ' + user });
      }
    }
  }
);

app.get(BASEURL + "/user/listusers/:role", isAdmin, async (req, res) => {
  try {
    res.json(await userManagement.listUsersByRole(req.params.role));
  } catch (err) {
    res.status(503).json({
      error: 'Database error during the request of users - ' + err,
    });
  }
});

app.delete(BASEURL + "/user/delete/:userId", isAdmin, async (req, res) => {
  try {
    await userManagement.deleteUserById(req.params.userId);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({
      error: 'Database error during the elimination of user - ' + err,
    });
  }
});

app.get(
  BASEURL + "/user/listusers",
  [
    check("role").isIn(["guest", "admin", "valet", "driver"]),
    check("name").isAlpha('it-IT', { ignore: ' ' }),
    check("surname").isAlpha('it-IT', { ignore: ' ' }),
  ],
  isAdmin,
  async (req, res) => {
    try {
      res.json(
        await userManagement.listUsers(
          req.query.role,
          req.query.name,
          req.query.surname
        )
      );
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the request of users - ' + err,
      });
    }
  }
);

app.put(
  BASEURL + "/user/update",
  [
    check("email").isEmail(),
    check("name").isAlpha('it-IT', { ignore: ' ' }),
    check("surname").isAlpha('it-IT', { ignore: ' ' }),
    check("birthdate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("phone").isMobilePhone(["it-IT"]),
  ],
  isLoggedIn,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const user = {
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      birthdate: req.body.birthdate,
      phone: req.body.phone,
      id: req.session.passport.user,
    };

    try {
      await userManagement.updateUser(user);
      console.log(req.user.email);
      mail.sendInformationChangedMail(req.user.email, req.user.name);
      res.status(201).end();
    } catch (err) {
      if (err.errno == 19) {
        res.status(513);
      } else {
        res.status(503);
      }
      res.json({
        error: 'Database error during the creation of user - ' + err,
      });
    }
  }
);

app.get(BASEURL + "/account/mydata", isLoggedIn, async (req, res) => {
  //console.log(req.user)
  try {
    res.json(await accountManagement.getGuestData(req.session.passport.user));
  } catch (err) {
    res.status(503).json({
      error: 'Database error during the creation of user - ' + err,
    });
  }
});

app.post(
  BASEURL + "/account/addcarlicense",
  [
    check("number").isAlphanumeric(),
    check("date").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("a").isBoolean(),
    check("am").isBoolean(),
    check("a1").isBoolean(),
    check("a1").isBoolean(),
    check("b").isBoolean(),
  ],
  isLoggedIn,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const carlicense = {
      refGuest: req.session.passport.user,
      number: req.body.number,
      date: req.body.date,
      a: req.body.a ? 1 : 0,
      am: req.body.am ? 1 : 0,
      a1: req.body.a1 ? 1 : 0,
      a2: req.body.a2 ? 1 : 0,
      b: req.body.b ? 1 : 0,
    };

    try {
      await accountManagement.createCarLicense(carlicense);
      mail.sendAddedLicenseMail(req.user.email, req.user.name);
      res.status(201).end();
    } catch (err) {
      if (err.errno == 19) {
        res.status(513);
      } else {
        res.status(503);
      }
      res.json({
        error: 'Database error during the creation of user - ' + err,
      });
    }
  }
);

app.get(BASEURL + "/account/getdatacarlicense", isLoggedIn, async (req, res) => {
  //console.log(req.user)
  try {
    const cl = await accountManagement.getCarLicenseData(req.session.passport.user);
    const carlicense = {
      number: cl.number,
      date: cl.date,
      a: cl.a ? true : false,
      am: cl.am ? true : false,
      a1: cl.a1 ? true : false,
      a2: cl.a2 ? true : false,
      b: cl.b ? true : false,
    };
    res.json(carlicense);
  } catch (err) {
    res.status(503).json({
      error: 'Database error during the request of car license - ' + err,
    });
  }
});

app.put(
  BASEURL + "/account/updatecarlicense",
  [
    check("number").isAlphanumeric(),
    check("date").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("a").isBoolean(),
    check("am").isBoolean(),
    check("a1").isBoolean(),
    check("a1").isBoolean(),
    check("b").isBoolean(),
  ],
  isLoggedIn,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const carlicense = {
      refGuest: req.session.passport.user,
      number: req.body.number,
      date: req.body.date,
      a: req.body.a ? 1 : 0,
      am: req.body.am ? 1 : 0,
      a1: req.body.a1 ? 1 : 0,
      a2: req.body.a2 ? 1 : 0,
      b: req.body.b ? 1 : 0,
    };

    try {
      await accountManagement.updateCarLicense(carlicense);
      mail.sendModifiedLicenseMail(req.user.email, req.user.name);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the updating of car license - ' + err,
      });
    }
  }
);

app.get(BASEURL + "/account/listpayments", isLoggedIn, async (req, res) => {
  try {
    res.json(await accountManagement.listPayments(req.session.passport.user));
  } catch (err) {
    res.status(503).json({
      error: 'Database error during the request of payments - ' + err,
    });
  }
});

app.delete(
  BASEURL + "/account/deletepayment/:id",
  [check("id").isInt({ min: 0 })],
  isLoggedIn,
  async (req, res) => {
    try {
      await accountManagement.deletePaymentMethodById(req.params.id);
      mail.sendPaymentMethodRemovedMail(req.user.email, req.user.name);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the creation of user - ' + err,
      });
    }
  }
);

app.post(
  BASEURL + "/account/addpaymentmethod",
  [
    check("number").isNumeric({ minLength: 16, maxLength: 16 }),
    check("date").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("cvv").isInt({ min: 0, max: 999 }),
    check("name").isAlpha('it-IT', { ignore: ' ' }),
    check("surname").isAlpha('it-IT', { ignore: ' ' }),
  ],
  isLoggedIn,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const paymentmethod = {
      number: req.body.number,
      date: req.body.date,
      cvv: req.body.cvv,
      name: req.body.name,
      surname: req.body.surname,
    };

    try {
      await accountManagement.createPaymentMethod(req.session.passport.user, paymentmethod);
      mail.sendPaymentMethodAddedMail(req.user.email, req.user.name);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the updating of user - ' + err,
      });
    }
  }
);

app.post(
  BASEURL + "/vehicle/add",
  [
    check("type").isIn(["electric scooter", "scooter", "car", "bicycle"]),
    check("category").isIn(["sedan", "utilitaire", "suv", ""]),
    check("refParking").isAlpha('it-IT', { ignore: ' ' }),
  ],
  isAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const vehicle = {
      type: req.body.type,
      category: req.body.category,
      refParking: req.body.refParking,
    };
    console.log(req.user.email);
    try {
      await vehicleManagement.createVehicle(vehicle);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the updating of user - ' + err,
      });
    }
  }
);

app.get(
  BASEURL + "/vehicle/listvehicle/:type",
  isLoggedIn,
  async (req, res) => {
    try {
      res.json(await vehicleManagement.listVehicle(req.params.type));
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the creation of user - ' + err,
      });
    }
  }
);

app.delete(BASEURL + "/vehicle/delete/:id", isAdmin, async (req, res) => {
  try {
    await vehicleManagement.deleteVehiclesById(req.params.id);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({
      error: 'Database error during the creation of user - ' + err,
    });
  }
});

app.put(
  BASEURL + "/vehicle/updatevehicle",
  [
    check("type").isIn(["electric scooter", "scooter", "car", "bicycle"]),
    check("id").isInt(),
    check("refParking").isAlpha('it-IT', { ignore: ' ' }),
  ],
  isAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const vehicle = {
      id: req.body.id,
      refParking: req.body.refParking,
      state: req.body.state,
    };

    try {
      await vehicleManagement.updateVehicle(vehicle);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the updating of user - ' + err,
      });
    }
  }
);

app.post(
  BASEURL + "/search/searchvehicles/",
  isLoggedIn,
  async (req, res) => {
    try {
      res.json(await searchManagement.searchVehicles(req.params.category, req.params.dateR, req.params.dateC, req.params.startParking));
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the creation of user - ' + err,
      });
    }
  }
);

app.post(BASEURL + "/search/searchcarwithdriver", isLoggedIn, async (req, res) => {
  try {
    if (await searchManagement.searchDrivers(req.params.dateR, req.params.dateC)) {
      res.json(await searchManagement.searchVehicles(req.params.category, req.params.dateR, req.params.dateC, req.params.startParking));
    }
    else {
      res.status(514).json({ error: 'No driver available' });
    }
  } catch (err) {
    res.status(503).json({
      error: 'Database error during the creation of user - ' + err,
    });
  }
});

app.get(
  BASEURL + "/reservation/getreservationdata/:id",
  isLoggedIn,
  async (req, res) => {
    try {
      res.json(await reservationManagement.getReservationDataById(req.params.id));
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the creation of user - ' + err,
      });
    }
  }
);

app.put(
  BASEURL + "/reservation/retirevehicle/:id",
  isLoggedIn,
  async (req, res) => {

    try {
      await reservationManagement.retireVehicle(req.params.id);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the updating of vehicle - ' + err,
      });
    }
  }
);

app.put(
  BASEURL + "/reservation/deliveryvehicle/:id",
  isLoggedIn,
  async (req, res) => {

    try {
      await reservationManagement.deliveryVehicle(req.params.id);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the updating of vehicle - ' + err,
      });
    }
  }
);

app.delete(
  BASEURL + "/reservation/deletereservation/:id",
  isLoggedIn,
  async (req, res) => {
    try {
      await reservationManagement.deleteReservationById(req.params.id);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: 'Database error while canceling the reservation - ' + err,
      });
    }
  }
);

app.put(
  BASEURL + "/reservation/vehicleBreakdown/",
  [
    check("id").isInt(),
    check("position").isAlpha('it-IT', { ignore: ' ' })
  ],
  isLoggedIn,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      await reservationManagement.vehicleBreakdown(req.body.id, req.body.position);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the updating of reservation - ' + err,
      });
    }
  }
);

app.get(
  BASEURL + "/reservation/vehiclewithoutreservation/",
  isLoggedIn,
  async (req, res) => {
    try {
      res.json(await reservationManagement.getVehicleWithoutReservation(req.query.type, req.query.category, req.query.position));
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the request of reservations - ' + err,
      });
    }
  }
);

app.put(
  BASEURL + "/reservation/updatevehicleinreservations/",
  [
    check("id").isInt(),
    check("newId").isInt()
  ],
  isLoggedIn,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      await reservationManagement.updateVehicleInReservations(req.body.id, req.body.newId);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the updating of reservation - ' + err,
      });
    }
  }
);

app.put(
  BASEURL + "/reservation/updatereservation/",
  [
    check("refParkingC").isAlpha('it-IT', { ignore: ' ' }),
    check("id").isInt(),
    check("refVehicles").isInt()
  ],
  isLoggedIn,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const reservation = {
      refParkingC: req.body.refParkingC,
      id: req.body.id,
      refVehicles: req.body.refVehicles
    };

    try {
      await reservationManagement.updateReservation(reservation);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: 'Database error during the updating of reservation - ' + err,
      });
    }
  }
);

/* -------------- */

app.get("/", (req, res) => {
  res.send("CIAO");
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
