const mongoose = require('mongoose');

const rawStatsSchema = new mongoose.Schema({
  data: {
    type: Object
  },
  playerId: {
    type: Number
  }
});

const rawStats = mongoose.model('rawPlayer', rawStatsSchema);
module.exports = rawStats;