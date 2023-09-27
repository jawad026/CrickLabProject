const express = require("express");
const newsController = require("../controller/news.controller");

const router = express.Router();


router.get("/", newsController.getNews);
router.post("/", newsController.addTheNews);


module.exports = router;
