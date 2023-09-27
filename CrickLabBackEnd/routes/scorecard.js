const express = require("express");
const scorecardController = require("../controller/scorecard.controller");

const router = express.Router();


router.get("/:id", scorecardController.getTheScoreCardById);
router.get("/player/topplayer", scorecardController.getTopPlayers);
router.get("/", scorecardController.getTheScoreCard);
router.post("/", scorecardController.addScoreCard);



module.exports = router;
