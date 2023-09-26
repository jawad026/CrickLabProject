const { getAllNews, addNews } = require("../services/news.service");

class newsController {
  async getNews(req, res, next) {
    try {
      const news = await getAllNews();
      if (!news) {
        return res.json({ message: "Something went wrong" });
      } else {
        return res.status(200).json(news);
      }
    } catch (error) {
      next(error);
    }
  }

  async addTheNews(req, res, next) {
    try {
      const news = await addNews(req);
      if (!news) {
        res.header(`Content-Type`, `application/json`);
        res.status(500).json({ message: "Unsuccessfull" });
        return res;
      } else {
        return res.status(200).json(news);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new newsController();
