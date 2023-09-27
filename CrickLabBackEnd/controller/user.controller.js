const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
  authenticateUser,
  registerUser,
  checkEmailExistence,
  loginUser,
  logoutUser,
} = require('../services/user.service');
const userModel = require("../models/user.model");

class userController {
  async loginUser(req, res, next) {
    loginUser(req, res, next);
  }

  async logoutUser(req, res, next) {
    try {

      const isLoggedOut = logoutUser(req);

      if (isLoggedOut) {
        return res.json({ message: "Logout successful" });
      } else {
        return res.status(500).json({ message: "Logout failed" });
      }
    } catch (error) {
      next(error);
    }
  }
  async signupUser(req, res, next) {
    try {
      const newUser = new userModel(req.body);
      await userModel.register(newUser, req.body.password);

      const user = await newUser.save();

      req.login(user, async (err) => {
        if (err) {
          console.error("Error during authentication:", err);
          return res.status(500).json({ err: "Authentication error" });
        }

        console.log("User authenticated successfully");
        return res
          .status(200)
          .json({ success: true, status: "Registration Successful!" });
      });
    } catch (err) {
      console.error("Error during user registration:", err);
      next(err);
    }
  }

}

module.exports = new userController();
