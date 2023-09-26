const mongoose = require("mongoose");
const teamSehema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSehema);
