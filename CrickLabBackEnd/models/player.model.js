const mongoose = require("mongoose");
const playerSehema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    team: {
      type: mongoose.Schema.ObjectId,
      ref: "team",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("player", playerSehema);
