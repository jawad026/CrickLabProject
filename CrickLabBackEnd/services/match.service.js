// services/product.services.js

const matchModel = require("../models/match.model");

class MatchService {
  async getThemactch(req, res, next) {
    try {
      const getMatches = await matchModel
        .find()
        .populate("teamA")
        .populate("teamB")
        .exec();
      return getMatches;
    } catch (error) {
      return error;
    }
  }
  async getTheOneMatch(req) {
    try {
      const getMatches = await matchModel
        .findById(req)
        .populate("teamA")
        .populate("teamB")
        .exec();
      return getMatches;
    } catch (error) {
      return error;
    }
  }
  async getSeriesMatches(req) {
    try {
      console.log(req);
      const getMatches = await matchModel
        .find({ seriesId: req })
        .populate("teamA")
        .populate("teamB")
        .exec();
      return getMatches;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async addMatch(req) {
    const newSeries = new matchModel(req.body);
    await newSeries.save();
    return newSeries;
  }
  async UpdateMatchStatus(req) {
    const { id, status } = req.body;
    try {
      const updatedMatch = await matchModel.findByIdAndUpdate(
        id,
        { $set: { status } },
        { new: true }
      );
      if (!updatedMatch) {
        return null;
      }
      return updatedMatch;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new MatchService();
