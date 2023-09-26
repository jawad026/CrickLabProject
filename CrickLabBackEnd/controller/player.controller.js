const PlayerService = require("../services/player.service");

class playerController {
 
  async getallPlayers(req, res, next) {
    try {
      const teams = await PlayerService.getAllPlayer();
      if (!teams) {
        return res.json({ message: "Something went wrong" });
      } else {
        return res.status(200).json(teams);
      }
    } catch (error) {
      next(error);
    }
  } async getPlayer(req, res, next) {
    try {
      const teams = await PlayerService.getThePlayer(req.params.id);
      if (!teams) {
        return res.json({ message: "Something went wrong" });
      } else {
        return res.status(200).json(teams);
      }
    } catch (error) {
      next(error);
    }
  }
  async addPlayers(req, res, next) {
    try {
      const players = await PlayerService.addPlayer(req);
      if (!players) {
        res.header(`Content-Type`, `application/json`);
        res.status(500).json({ message: "Unsuccessfull" });
        return res;
      } else {
        return res.status(200).json(players);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new playerController();
