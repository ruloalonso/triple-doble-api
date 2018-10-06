require('../config/db.config');
const mongoose = require('mongoose');
const Player = require('../models/player.model');
const RawStats = require('../models/rawPlayer.model');
const axios = require('axios');

let wins = 0;
let fails = 0;

// setPlayerIds();
getStats();

function setPlayerIds() {
  RawStats.find()
    .then(players => {
      if (!players.length) {
        Player.find()
          .then(players => {
            players.forEach(player => {
              let rawStats = new RawStats();
              rawStats.playerId = player.playerId;
              rawStats.save()
                .then(newPlayer => {
                  console.log(`PlayerId saved!!! ${newPlayer.playerId} ${++wins}`)
                })
                .catch(e => {
                  console.error(e);
                });
              })       
        })
      } else {
        console.log('Player Ids already setted up in Stats Collection. Getting Stats...........')
      }
    })
  
}

function getStats() {
  RawStats.find()
    .then(players => {
      if (!players) {
        console.log('OOPS!! No players found in database... WTF');
        mongoose.connection.close();
      } else {
        players.forEach(player => {
          if (!player.data) {
            axios.get(`https://stats.nba.com/stats/playerprofilev2?PerMode=PerGame&PlayerID=${player.playerId}`)
              .then(response => {
                if (response.data.resultSets) {
                  RawStats.findByIdAndUpdate(player._id, { $set: { data: response.data.resultSets[0] }})
                    .then(newPlayer => {
                      console.log(`Stats saved!!! ${newPlayer.playerId} ${++wins}`)
                    })
                    .catch(e => {
                      console.error(e);
                    })
                } else {
                  console.log('Bad response from NBA API :( Fails: ' + ++fails)
                }         
              })
              .catch(e => {
                console.error(e);
              });
          } else {
            console.log('This player already has stats: ' + ++wins)
          }                    
        })
      }
    })
}
