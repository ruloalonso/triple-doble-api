require('../config/db.config');
const mongoose = require('mongoose');
const Player = require('../models/player.model');
const axios = require('axios');

let wins = 0;
let fails = 0;

Player.find()
  .then(players => {
    if (!players.length) {
      console.log('OOPS!! No players found in database... WTF');
      mongoose.connection.close();
    } else {
      players.forEach(player => {
        axios.get(`https://stats.nba.com/stats/playerprofilev2?PerMode=PerGame&PlayerID=${player.playerId}`)
          .then(response => {
            if (response.data) {
              console.log(response.data)
              response.data.resultSets[0].rowSet.forEach((set) => {
                if (set[1] === '2017-18') {
                  let parsedStats = {
                    gp: set[6],
                    min: set[8],
                    oreb: set[18],
                    dreb: set[19],
                    ast: set[21],
                    stl: set[22],
                    blk: set[23],
                    tov: set[24],
                    pf: set[25],
                    pts: set[26]
                  };
                  Player.findOneAndUpdate({playerId: player.playerId}, {$set:{pastSeasonStats: parsedStats}})
                    .then(foundPlayer => {
                      if (foundPlayer) {
                        console.log('Player updated from DB!!! Wins: ' + ++wins);
                      } else {
                        console.log(`----------------> Player not found :( ${player.firstName} ${player.lastName}. - ${player.playerId}. Fails: ${++fails}`);
                      }
                    })
                    .catch(e => {
                      console.error(e);
                    });            
                }
              })
            } else {
              console.log('No response from NBA API :(')
            }         
          })
          .catch(e => {
            console.error(e);
          });         
      })
    }
  })
