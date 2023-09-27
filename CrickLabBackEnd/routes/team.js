const express = require("express");
const seriesController = require("../controller/series.controller");
const teamController = require("../controller/team.controller");

const router = express.Router();


router.get("/", teamController.getTeams);
router.post("/addteam", teamController.addTeam);

module.exports = router;
