const express = require("express");
const playerController = require("../controller/player.controller");

const router = express.Router();


router.get("/:id", playerController.getPlayer);
router.get("/", playerController.getallPlayers);
router.post("/addplayer", playerController.addPlayers);



module.exports = router;
