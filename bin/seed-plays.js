require('../config/db.config');
const mongoose = require('mongoose');
const Play = require('../models/play.model');
const Player = require('../models/player.model');

let games = 3;

Player.find()
  .then(players => {
    players.forEach(player => {
      for (let i = 0; i < games; i++) {
        let play = new Play();
        play.pts = Math.floor(Math.random() * 30) + 1;
        play.reb = Math.floor(Math.random() * 15) + 1;
        play.as = Math.floor(Math.random() * 12) + 1;
        play.player = player._id;
        play.save()
          .then(play => {
            if (player.position === 'G') player.fp += play.as;
            if (player.position === 'F') player.fp += play.pts;
            if (player.position === 'C') player.fp += play.reb;
            player.save()
              .then(player => {
                console.log('Player FP updated!!')
              })
          });
      }          
    })
  })
