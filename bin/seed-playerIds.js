require('../config/db.config');
const mongoose = require('mongoose');
const Player = require('../models/player.model');
const info = require('nba');

Player.find()
  .then(players => {
    let fails = [];
    players.forEach(player => {
      // console.log(`${player.firstName} ${player.lastName}`);
      const nbaPlayer = info.findPlayer(`${player.firstName} ${player.lastName}`);      
      if (!nbaPlayer) fails.push(player);
    })
    console.log(fails.length + ' fails');
    
  })
