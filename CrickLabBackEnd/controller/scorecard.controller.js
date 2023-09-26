const {
  addScoreCard,
  getScoreById,
  getScore,
  getTopScorer,
} = require("../services/scorecard.service");

class scorecardController {
  async getTheScoreCardById(req, res, next) {
    try {
      const scorecard = await getScoreById(req.params.id);
      if (!scorecard) {
        return res.json({ message: "Something went wrong" });
      } else {
        return res.status(200).json(scorecard);
      }
    } catch (error) {
      next(error);
    }
  }
  async getTheScoreCard(req, res, next) {
    try {
      const scorecard = await getScore();
      if (!scorecard) {
        return res.json({ message: "Something went wrong" });
      } else {
        return res.status(200).json(scorecard);
      }
    } catch (error) {
      next(error);
    }
  }
  async getTopPlayers(req, res, next) {
    try {
      const scorecard = await getTopScorer();
      if (!scorecard) {
        return res.json({ message: "Something went wrong" });
      } else {
        return res.status(200).json(scorecard);
      }
    } catch (error) {
      next(error);
    }
  }

  async addScoreCard(req, res, next) {
    try {
      const scorecard = await addScoreCard(req);
      if (!scorecard) {
        res.header(`Content-Type`, `application/json`);
        res.status(500).json({ message: "Unsuccessfull" });
        return res;
      } else {
        return res.status(200).json(scorecard);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new scorecardController();
