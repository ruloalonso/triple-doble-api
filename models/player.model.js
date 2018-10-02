const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerId: {
    type: Number,
    //required: 'Player is required'
  },
  firstName: {
    type: String,
    required: 'First name is required'
  },
  lastName: {
    type: String,
    required: 'Last name is required'
  },
  contracts: {
    type: [Number],
    default: []
  },
  team: {
    type: String,
    required: 'Team is required'
  },
  jersey: Number,
  image: String,
  position: String
}, { 
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;      
      return ret;
    }
  }
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;