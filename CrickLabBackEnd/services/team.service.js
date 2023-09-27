
const teamModel = require("../models/teams.model");

class TeamService {
  async getTheTeams(req, res, next) {
    try {
      const getTeams = await teamModel.find();
      return getTeams;
    } catch (error) {
      next(error);
    }
  }
  async addTeams(req) {
    const newteam = new teamModel(req.body);
    await newteam.save();
    return newteam;
  }
}

module.exports = new TeamService();
