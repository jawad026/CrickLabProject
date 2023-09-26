const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 45,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
