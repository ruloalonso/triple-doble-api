require('../config/db.config');
const mongoose = require('mongoose');
const Player = require('../models/player.model');
const info = require('nba');
const axios = require('axios');

// jordan es el 893!!!
let count = 0;

axios.get('https://stats.nba.com/stats/commonallplayers?Season=2018-19&LeagueID=00&IsOnlyCurrentSeason=1')
  .then(response => {
    console.log(response.data.resultSets[0].rowSet.length + ' players found');
    let players = response.data.resultSets[0].rowSet;
    players.forEach(player => {
      let fullName = player[2];      
      let comma = player[1].indexOf(',');
      let firstName = '';
      let lastName = '';
              
      if (comma === -1) {        
        if (fullName === 'Nene') {
          firstName = 'Nene';
          lastName = 'Hilario';
        }
        if (fullName === 'Zhou Qi') {
          firstName = 'Zhou';
          lastName = 'Qi';
        } 
      } else {
        firstName = player[1].substr(comma+2);
        lastName = player[1].substr(0, comma)
      }
      
      if (lastName.indexOf('III') > 0 || lastName.indexOf('Jr') > 0) {
        lastName = lastName.substring(0, lastName.length - 4)
      }

      if (lastName === 'Antetokounmpo') {
        firstName = 'Giannis';
      }

      if (lastName === 'Redick') {
        firstName = 'J.J.';
      }

      if (firstName === 'Juancho') {
        firstName = 'Juan';
      }

      if (firstName === 'JR' && lastName === 'Smith') {
        firstName = 'J.R.';
      }

      if (lastName.indexOf('IV') > 0 || lastName.indexOf('II') > 0) {
        lastName = lastName.substring(0, lastName.length - 3)
      }

      let newPlayer = new Player();

      newPlayer.playerId = player[0];
      newPlayer.firstName = firstName;
      newPlayer.lastName = lastName;

      // console.log(newPlayer);
      // console.log(++count);

      // Player.findOne({firstName: firstName, lastName: lastName})
      //   .then(dbPlayer => { 
      //     if (!dbPlayer) {
      //       console.log( '#' + ++fails + ' ' + firstName + ' ' + lastName)
      //     }
      //   })            
      
    })
  })


