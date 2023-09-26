const {
  getThemactch,
  addMatch,
  getTheOneMatch,
  UpdateMatchStatus,
  getSeriesMatches,
} = require("../services/match.service");
const { getAllSeries, addSeries } = require("../services/series.service");

class matchController {
  async getMatch(req, res, next) {
    try {
      const match = await getThemactch();
      if (!match) {
        return res.json({ message: "Something went wrong" });
      } else {
        return res.status(200).json(match);
      }
    } catch (error) {
      next(error);
    }
  }
  async getOneMatch(req, res, next) {
    try {
      const match = await getTheOneMatch(req.params.id);
      if (!match) {
        return res.json({ message: "Something went wrong" });
      } else {
        return res.status(200).json(match);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getSeriesMatch(req, res, next) {
    try {
      console.log(req.params)
      const match = await getSeriesMatches(req.params.id);
      if (!match) {
        return res.json({ message: "Something went wrong" });
      } else {
        return res.status(200).json(match);
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
  }
  async addTheMatch(req, res, next) {
    try {
      const match = await addMatch(req);

      if (!match) {
        res.header(`Content-Type`, `application/json`);
        res.status(500).json({ message: "Unsuccessfull" });
        return res;
      } else {
        return res.status(200).json(match);
      }
    } catch (error) {
      next(error);
    }
  }
  async patchMatchStatus(req, res, next) {
    try {
      const match = await UpdateMatchStatus(req);
      if (!match) {
        res.header(`Content-Type`, `application/json`);
        res.status(500).json({ message: "Unsuccessfull" });
        return res;
      } else {
        return res.status(200).json(match);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new matchController();
