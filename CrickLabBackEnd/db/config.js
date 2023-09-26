const mongoose = require("mongoose");

const DB = process.env.MONGO_URL;
console.log(DB);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err));
