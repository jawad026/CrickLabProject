const { getTheTeams,addTeams } = require("../services/team.service");

class teamController {
  async getTeams(req, res, next) {
    try {
      const teams = await getTheTeams();
      if (!teams) {
        return res.json({ message: "Something went wrong" });
      } else {
        return res.status(200).json(teams);
      }
    } catch (error) {
      next(error);
    }
  }

  async addTeam(req, res, next) {
    try {
      const series = await addTeams(req);

      if (!series) {
        res.header(`Content-Type`, `application/json`);
        res.status(500).json({ message: "Unsuccessfull" });
        return res;
      } else {
        return res.status(200).json(series);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new teamController();
