const express = require("express");
const newsController = require("../controller/news.controller");

const router = express.Router();

/* GET users listing. */

router.get("/", newsController.getNews);
router.post("/", newsController.addTheNews);

// Add the signup route

module.exports = router;
