const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

passport.use(
  new LocalStrategy({ usernameField: "email" }, userModel.authenticate())
);

const jwtOptions = {
  secretOrKey: process.env.SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await userModel.findById(payload.sub);

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

function signToken(userId) {
  return jwt.sign({ sub: userId }, process.env.SECRET_KEY, { expiresIn: "1d" });
}
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const verifyUser = passport.authenticate("jwt", { session: false });

module.exports = {
  passport,
  signToken,
  verifyUser,
};
