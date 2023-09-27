const newsModel = require("../models/news.model");

class NewsService {
  async getAllNews(req, res, next) {
    try {
      const getnews = await newsModel.find();
      return getnews;
    } catch (error) {
      next(error);
    }
  }
  async addNews(req) {
    const newNews = new newsModel(req.body);
    await newNews.save();
    return newNews;
  }
}

module.exports = new NewsService();
