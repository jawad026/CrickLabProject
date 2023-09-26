// services/product.services.js

const matchModel = require("../models/match.model");

class MatchService {
  async getThemactch(req, res, next) {
    try {
      // Call the logoutUser function from the AuthService
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
      // Call the logoutUser function from the AuthService
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
      // Call the logoutUser function from the AuthService
      console.log(req);
      const getMatches = await matchModel
        .find({ seriesId: req })
        .populate("teamA")
        .populate("teamB")
        .exec();
      return getMatches;
    } catch (error) {
      console.log(error)
      return error;
    }
  }
  async addMatch(req) {
    const newSeries = new matchModel(req.body);
    await newSeries.save();
    return newSeries;
  }
  async UpdateMatchStatus(req) {
    const { id, status } = req.body; // Assuming _id and status are present in req.body

    try {
      // Update the "status" field of the document by its _id using $set
      const updatedMatch = await matchModel.findByIdAndUpdate(
        id,
        { $set: { status } }, // Use $set to update only the "status" field
        { new: true } // Ensure the updated document is returned
      );

      if (!updatedMatch) {
        // Handle the case where the document with the given _id was not found
        return null;
      }

      return updatedMatch;
    } catch (error) {
      // Handle any errors that occur during the update
      console.error(error);
      throw error;
    }
  }
}

module.exports = new MatchService();
