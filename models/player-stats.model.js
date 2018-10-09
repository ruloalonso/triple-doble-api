const mongoose = require('mongoose');

const playerStatsSchema = new mongoose.Schema({
  data: {
    type: Object
  },
  playerId: {
    type: Number
  }
});

const PlayerStat = mongoose.model('PlayerStat', playerStatsSchema);
module.exports = PlayerStat;