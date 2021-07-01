const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const userManagement = require("./userManagement");

// Inizializzazione di Passport
function initialize(passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      userManagement.getUser(username, password).then((user) => {
        if (!user)
          return done(null, false, {
            message: "Incorrect username and/or password.",
          });

        return done(null, user);
      });
    })
  );

  // Inserisce l'utente nella sessione
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Estrae l'utente corrente dalla sessione
  passport.deserializeUser((id, done) => {
    userManagement
      .getUserById(id)
      .then((user) => {
        done(null, user); // Questa informazione sarà disponibile su req.user
      })
      .catch((err) => {
        done(err, null);
      });
  });
}

module.exports = initialize;
