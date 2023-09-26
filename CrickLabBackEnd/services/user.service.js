// services/authService.js
const passport = require("passport");
const bcrypt = require("bcrypt");

var authenticate = require("../config/passport.config");
const userModel = require("../models/user.model");
class AuthService {
  async loginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        res.statusCode = 401;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, status: "Login Unsuccessful!", err: info });
        res.end();
      } else {
        req.logIn(user, (err) => {
          if (err) {
            res.statusCode = 401;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: false,
              status: "Login Unsuccessful!",
              err: err,
            });
            res.end();
          }
          var token = authenticate.signToken({ _id: req.user._id });
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: true,
            status: "Login Successful!",
            token: token,
            user: {
              name: req.user.name,
              email: req.user.email,
              phone: req.user.phone,
            },
          });
        });
      }
    })(req, res, next);
  }

  async checkEmailExistence(email) {
    try {
      const existingUser = await userModel.findOne({ email });
      return !!existingUser; // Return true if the email exists, false otherwise
    } catch (error) {
      throw error;
    }
  }

  async hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async authenticateUser(email, password) {
    const user = await userModel.findOne({ email });
    if (!user || !user.validPassword(password)) {
      throw new Error("Incorrect email or password");
    }
    return user;
  }

  async registerUser({ email, password, phone, name }) {
    try {
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user record
      const newUser = new userModel({
        email,
        hash_password: hashedPassword,
        name,
        phone,
      });
      await newUser.save();

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, updates) {
    try {
      // Find the user by userId and update their information
      const user = await userModel.findByIdAndUpdate(userId, updates, {
        new: true,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(userId, currentPassword, newPassword) {
    try {
      // Find the user by userId
      const user = await userModel.findById(userId);

      // Check if the provided current password matches the stored password
      if (!user.validPassword(currentPassword)) {
        throw new Error("Incorrect current password");
      }

      // Hash the new password before updating it
      const hashedPassword = await this.hashPassword(newPassword);

      // Update the password
      user.password = hashedPassword;
      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async logoutUser(req) {
    try {
      // Use Passport.js req.logout() to log the user out and clear the session
      req.logout();
      return true; // Indicate that logout was successful
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
