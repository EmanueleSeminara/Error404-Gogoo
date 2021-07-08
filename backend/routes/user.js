const express = require("express");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcrypt");
var generator = require("generate-password");
const isLoggedIn = require("../middleware/isLoggedIn");

const userManagement = require("../models/userManagement");
const mail = require("../models/mail");
const router = express.Router();

// LOGIN
router.post("/sessions", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json(info);
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json(req.user);
    });
  })(req, res, next);
});

// LOGOUT
router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.end();
});

// REGISTRAZIONE
router.post(
  "/register",
  [
    check("email").isEmail(),
    check("name").isAlpha("it-IT", { ignore: " " }),
    check("surname").isAlpha("it-IT", { ignore: " " }),
    check("birthdate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
    check("phone").isMobilePhone(["it-IT"]),
    check("password").isStrongPassword(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
    }

    const user = {
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      birthdate: req.body.birthdate,
      phone: req.body.phone,
      password: await bcrypt.hash(req.body.password, 10),
    };

    try {
      await userManagement.createGuest(user);
      mail.sendWelcomeMail(user.email, user.name);
      res.status(201).end();
    } catch (err) {
      if (err.errno == 19) {
        res.status(513);
      } else {
        res.status(503);
      }
      res.json({
        error: "Database error during the creation of user - " + err,
      });
    }
  }
);

// MODIFICA PASSWORD
router.put(
  "/changepassword",
  isLoggedIn,
  [check("password").isStrongPassword()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const user = await userManagement.updatePassword(
        req.session.passport.user,
        await bcrypt.hash(req.body.password, 10)
      );
      mail.sendPasswordChangedMail(req.user.email, req.user.name);
      res.status(201).end();
    } catch (err) {
      console.log(err);
      res.status(503).json({
        error: "Database error during the update of user s password - " + err,
      });
    }
  }
);

// PASSWORD DIMENTICATA
router.post("/forgotpassword", [check("email").isEmail()], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
  try {
    var password = generator.generate({
      length: 8,
      numbers: true,
      symbols: true,
      strict: true,
    });
    const hashPassword = await bcrypt.hash(password, 10);
    await userManagement.forgotPassword(req.body.email, hashPassword);
    mail.sendRecoveryPasswordMail(req.body.email, password);
    res.status(201).end();
  } catch (err) {
    if (err) {
      res
        .status(513)
        .json({ error: "The email is not associated with any account." });
    } else {
      res.status(503).json({
        error: "Database error during the creation of user - " + user,
      });
    }
  }
});

module.exports = router;
