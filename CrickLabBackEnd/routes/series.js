const express = require("express");
const seriesController = require("../controller/series.controller");

const router = express.Router();



router.get("/", seriesController.getSeries);
router.post("/addseries", seriesController.addTheSries);


module.exports = router;
