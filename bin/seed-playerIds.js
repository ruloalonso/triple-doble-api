require('../config/db.config');
const mongoose = require('mongoose');
const Player = require('../models/player.model');
const info = require('nba');
const axios = require('axios');

// jordan es el 893!!!

axios.get('https://stats.nba.com/stats/commonallplayers?Season=2018-19&LeagueID=00&IsOnlyCurrentSeason=1')
  .then(response => {
    console.log(response.data.resultSets[0].rowSet.length + ' players found');
    let players = response.data.resultSets[0].rowSet;
    let fails = 0;
    players.forEach(player => {
      let playerId = player[0];
      let fullName = player[2];      
      let comma = player[1].indexOf(',');
      let firstName = '';
      let lastName = '';
      
      if (comma === -1) {
        if (fullName = 'Nene') {
          firstName = 'Nene';
          lastName = 'Hilario';
        }
        if (fullName = 'Zhou Qi') {
          firstName = 'Zhou';
          lastName = 'Qi';
        } 
      } else {
        firstName = player[1].substr(comma+2);
        lastName = player[1].substr(0, comma)
      }

      lastName = parseLastName(lastName);

      Player.findOne({firstName: firstName, lastName: lastName})
        .then(dbPlayer => { 
          // console.log(dbPlayer)
          if (!dbPlayer) {
            console.log(player[2]);
            console.log(++fails);
            // console.log(parseLastName(lastName));
          }
          //parseLastName(lastName);
        })            
      
    })
  })

function parseLastName(lastName) {  
  return lastName.indexOf('Jr') > 0 ? lastName.substring(0, lastName.length - 4) : lastName;
}
