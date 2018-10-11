const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
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

const Play = mongoose.model('Play', playSchema);
module.exports = Play;