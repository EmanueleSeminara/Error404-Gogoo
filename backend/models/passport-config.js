const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const userManagement = require("./userManagement");


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

    passport.serializeUser((user, done) => {
        //console.log("serializeUser: user:" + JSON.stringify(user));
        done(null, user.id);
    });

    // starting from the data in the session, we extract the current (logged-in) user
    passport.deserializeUser((id, done) => {
        //console.log("deserializeUser: id:" + id);
        userManagement
            .getUserById(id)
            .then((user) => {
                //console.log("deserializeUser: user da db:" + JSON.stringify(user));
                done(null, user); // this will be available in req.user
            })
            .catch((err) => {
                done(err, null);
            });
    });
}



module.exports = initialize