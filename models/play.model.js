const mongoose = require('mongoose');

const playeSchema = new mongoose.Schema({
  nbaGameId: {
    type: String
  },
  date: {
    type: Date
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  pts: {
    type: Number
  },
  reb: {
    type: Number
  },
  as: {
    type: Number
  },
});

const PlayerStat = mongoose.model('PlayerStat', playerStatsSchema);
module.exports = PlayerStat;