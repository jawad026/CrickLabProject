const express = require("express");
const seriesController = require("../controller/series.controller");

const router = express.Router();

/* GET users listing. */

router.get("/", seriesController.getSeries);
router.post("/addseries", seriesController.addTheSries);

// Add the signup route

module.exports = router;
