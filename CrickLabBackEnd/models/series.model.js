const mongoose = require("mongoose");
const seriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    over: {
      type: String,
      required: true,
    },
    teams: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Series", seriesSchema);
