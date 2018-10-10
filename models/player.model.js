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
  image: String
  // contracts: {
  //   type: [Number],
  //   default: []
  // }
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;