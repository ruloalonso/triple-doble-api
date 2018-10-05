// require('../config/db.config');
const mongoose = require('mongoose');
const Player = require('../models/player.model');
const axios = require('axios');


// let wins = 0;
// let fails = 0;

Player.find()
  .then(players => {
    if (!players.length) {
      console.log('\OOPS!! No players found in database... WTF');
      mongoose.connection.close();
    } else {
      players.forEach(player => {
        let stats = getStats(player)
          .then(() => {
            player.stats = {};
            player.stats.pastSeason = stats;
          });
      })
    }
  })


function getStats(player) {
  axios.get(`https://stats.nba.com/stats/playerprofilev2?PerMode=PerGame&PlayerID=${player.playerId}`)
    .then(response => {
      console.log('check')
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
          console.log(player)
          console.log(parsedStats)
          return new Promise(function(resolve, reject) {
            resolve(parsedStats);
          });          
        }
      })
    })
}

// getStats({playerid: '201939'})

// axios.get(`https://stats.nba.com/stats/playerprofilev2?PerMode=PerGame&PlayerID=201939`)
//   .then(response => {
//       response.data.resultSets[0].rowSet.forEach((set) => {
//         if (set[1] === '2017-18') {
//           console.log(set);
//           let newPlayer = {};
//           newPlayer.stats = {};
//           let stats = {
//             gp: set[6],
//             min: set[8],
//             oreb: set[18],
//             dreb: set[19],
//             ast: set[21],
//             stl: set[22],
//             blk: set[23],
//             tov: set[24],
//             pf: set[25],
//             pts: set[26]
//           }
//           newPlayer.stats.lastSeason = stats;
//           console.log()
//           console.log(stats)
//         }
//       })
//       mongoose.connection.close();
//     })

//                   newPlayer.save()
//               .then(data => {
//                 console.log(++count + ' players created from NBA API');
//                 mongoose.connection.close();
//               })
//               .catch(e => {
//                 console.error(e);
//                 mongoose.connection.close();
//               });      
//           })
//       })
//     }
//   })

// function updatePlayer(player) {
//   Player.findOneAndUpdate({firstName: player.firstName, lastName: player.lastName}, {$set:{contracts: player.contracts}})
//     .then(foundPlayer => {
//       if (foundPlayer) {
//         console.log('Player fetched from CSV!!! Wins: ' + ++wins);
//       } else {
//         console.log(`Player not found: ${player.firstName} ${player.lastName}. Fails: ${++fails}`);
//       }
//       mongoose.connection.close();
//     })
//     .catch(e => {
//       console.error(e);
//       mongoose.connection.close();
//     });
// }
