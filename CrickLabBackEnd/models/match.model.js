const mongoose = require("mongoose");
const matchSchema = new mongoose.Schema(
  {
    teamA: {
      type: mongoose.Schema.ObjectId,
      ref: "Team",
    },
    teamB: {
      type: mongoose.Schema.ObjectId,
      ref: "Team",
    },
    datetime: {
      type: Date,
    },
    status: {
      type: String,
      default: "pending",
    },
    over: {
      type: String,
    },
    seriesId: {
      type: String,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);
