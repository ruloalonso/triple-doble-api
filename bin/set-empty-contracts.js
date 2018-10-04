require('../config/db.config');
const mongoose = require('mongoose');
const Player = require('../models/player.model');
const parse = require('csv-parse');
var fs = require('file-system');

Player.updateMany({contracts: []}, {$set:{contracts: ['1567007']}})
  .then(players => {
    if (players.nModified !== 0) {
      console.log(players.nModified + ' players without contract were updated')
    } else {
      console.log('\nNo players were updated\n')
    }
    mongoose.connection.close(); 
  })
