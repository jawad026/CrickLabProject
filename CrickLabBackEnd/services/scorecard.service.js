
const playerModel = require("../models/player.model");
const scorecardModel = require("../models/scorecard.model");

class ScoreCardService {
  async getScoreById(req, res, next) {
    try {
      const getScoreCard = await scorecardModel.find({ match: req });
      return getScoreCard;
    } catch (error) {
      return error;
    }
  }
  async getTopScorer(req, res, next) {
    const playerTotals = {};
    try {
      const getScoreCard = await scorecardModel.find();
      const getPlayer = await playerModel.find();

      for (const item of getScoreCard) {
        const playerScore = item.playerScore;

        for (const playerId in playerScore) {
          playerTotals[playerId] =
            (playerTotals[playerId] || 0) + playerScore[playerId];
        }
      }

      const playerTotalsArray = Object.entries(playerTotals);
      playerTotalsArray.sort((a, b) => b[1] - a[1]);
      const playerInfoPromises = playerTotalsArray.map(
        async ([playerId, totalScore]) => {
          const playerInfo = getPlayer.find(
            (player) => player._id.toString() === playerId
          );

          if (playerInfo) {
            return {
              playerName: playerInfo.name,
              totalScore: totalScore,
            };
          } else {
            console.error(`Player info not found for playerId: ${playerId}`);
            return null; 
          }
        }
      );
      const topPlayers = await Promise.all(playerInfoPromises);

      return topPlayers.slice(0, 10);
    } catch (error) {

      console.error(error);
      throw error; 
    }
  }

  async getScore(req, res, next) {
    try {
      const getScoreCard = await scorecardModel.find();
      return getScoreCard;
    } catch (error) {
      next(error);
    }
  }
  async addScoreCard(req) {
    const newScoreCard = new scorecardModel(req.body);
    await newScoreCard.save();
    return newScoreCard;
  }
}

module.exports = new ScoreCardService();
