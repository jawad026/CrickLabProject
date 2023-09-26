const express = require("express");
const seriesController = require("../controller/series.controller");
const teamController = require("../controller/team.controller");

const router = express.Router();

/* GET users listing. */

router.get("/", teamController.getTeams);
router.post("/addteam", teamController.addTeam);

// Add the signup route

module.exports = router;
