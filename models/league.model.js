const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['application', 'draft', 'season'],
    default: 'application'
  },
  round: {
    type: Number,
    default: 1
  },
  turn: {
    type: Number,
    default: 1
  },
  maxUsers: {
    type: Number,
    default: 2
  },
  maxPlayers: {
    type: Number,
    default: 3
  }
});

const League = mongoose.model('League', leagueSchema);
module.exports = League;
