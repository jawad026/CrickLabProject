const mongoose = require("mongoose");
const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
