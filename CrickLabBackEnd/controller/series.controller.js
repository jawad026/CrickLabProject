const { getAllSeries, addSeries } = require("../services/series.service");

class seriesController {
  async getSeries(req, res, next) {
    try {
      const series = await getAllSeries();
      if (!series) {
        return res.json({ message: "Something went wrong" });
      } else {
        return res.status(200).json(series);
      }
    } catch (error) {
      next(error);
    }
  }

  async addTheSries(req, res, next) {
    try {
      //   await verifyUser(req, res, () => {});

      //   // Check if the user is authenticated (verified)
      //   if (!req.user) {
      //     res.header(`Content-Type`, `application/json`);
      //     res.status(401);
      //     res.json({ message: "Unauthorized. Please login." });
      //     return res;
      //   }

      //   req.body.User = req.user._id;
      //   console.log(req.user);

      const series = await addSeries(req);

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

module.exports = new seriesController();
