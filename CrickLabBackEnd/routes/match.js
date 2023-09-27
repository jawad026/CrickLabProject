const express = require("express");
const seriesController = require("../controller/series.controller");
const matchController = require("../controller/match.controller");

const router = express.Router();

router.get("/", matchController.getMatch);
router.get("/:id", matchController.getOneMatch);
router.get("/series/:id", matchController.getSeriesMatch);
router.post("/addmatch", matchController.addTheMatch);
router.patch("/", matchController.patchMatchStatus);

module.exports = router;
