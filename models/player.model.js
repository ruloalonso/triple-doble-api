const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerId: {
    type: Number,
  },
  firstName: {
    type: String,
    required: 'First name is required'
  },
  lastName: {
    type: String,
    required: 'Last name is required'
  },
  team: {
    type: String,
    required: 'Team is required'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  image: String,
  position: {
    type: String,
    enum: ['G', 'F', 'C', 'B']
  },
  fp: {
    type: Number,
    default: 0
  }
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;