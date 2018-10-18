require('../config/db.config');
const mongoose = require('mongoose');
const Player = require('../models/player.model');
const info = require('nba');
const axios = require('axios');

// jordan es el 893!!!

let count = 0;

Player.find()
  .then(players => {
    if (players.length !== 0) {
      console.log('\nPlease DROP the database befor getting new players\n');
      mongoose.connection.close();
    } else {
      console.log('hola get-players')
      axios.get('https://stats.nba.com/stats/commonallplayers?Season=2018-19&LeagueID=00&IsOnlyCurrentSeason=1')
        .then(response => {
          console.log('hola axios!')
          console.log(response.data.resultSets[0].rowSet.length + ' players found');
          let players = response.data.resultSets[0].rowSet;
          players.forEach(player => {
            let newPlayer = new Player();
            newPlayer.playerId = player[0];
            newPlayer.team = player[10];

            fullName = player[2];
            let comma = player[1].indexOf(','); 

            if (comma === -1) {        
              if (fullName === 'Nene') {
                newPlayer.firstName = 'Nene';
                newPlayer.lastName = 'Hilario';
              }
              if (fullName === 'Zhou Qi') {
                newPlayer.firstName = 'Zhou';
                newPlayer.lastName = 'Qi';
              } 
            } else {
              newPlayer.firstName = player[1].substr(comma+2);
              newPlayer.lastName = player[1].substr(0, comma)
            }

            newPlayer.save()
              .then(data => {
                console.log(++count + ' players created from NBA API');
                mongoose.connection.close();
              })
              .catch(e => {
                console.error(e);
                mongoose.connection.close();
              });      
          })
      })
    }
  })




