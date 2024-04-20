const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET_KEY;

const User = require("../models/User");

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          }
          bcrypt
            .compare(password, user.password)
            .then((isMatch) => {
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, {
                  message: "Incorrect email or password.",
                });
              }
            })
            .catch((err) => done(err));
        })
        .catch((err) => done(err));
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(
  "jwt",
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.userId)
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => done(err, false));
  })
);
