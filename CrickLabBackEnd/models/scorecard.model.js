const mongoose = require("mongoose");
const scoreCardSchema = new mongoose.Schema(
  {
    batting: { type: String },
    balling: { type: String },
    
    run: { type: Number },
    ball: { type: Number },
    active: { type: [String] },
    out: { type: [String] },
    baller: { type: [String] },
    playerScore: { type: mongoose.Schema.Types.Mixed },
    match: {
      type: mongoose.Schema.ObjectId,
      ref: "Match",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ScoreCard", scoreCardSchema);
