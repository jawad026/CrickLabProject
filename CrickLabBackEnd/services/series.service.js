
const seriesModel = require("../models/series.model");

class SeriesService {
  async getAllSeries(req, res, next) {
    try {
      const getSeries = await seriesModel.find();
      return getSeries;
    } catch (error) {
      next(error);
    }
  }
  async addSeries(req) {
    const newSeries = new seriesModel(req.body);
    await newSeries.save();
    return newSeries;
  }
}

module.exports = new SeriesService();
