const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  salaryCap: {
    type: Number,
    default: 101869000
  },
  totalSalaries: {
    type: Number,
    default: 0
  }
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;