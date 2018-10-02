const info = require('nba');

const data = require('nba.js').data;

const nbaStatsClient = require('nba-stats-client');

// NBA 
// https://github.com/bttmly/nba/blob/master/doc/stats.md

const curry = info.findPlayer('Curry');
console.log('\n TRENT INFO  \n');
console.log(curry);

info.stats.playerInfo({ 
  PlayerID: curry.playerId 
}).then(info => {
  console.log('\n CURRY MORE INFO  \n');
  console.log(info);
});



// NBA.JS
// https://github.com/kshvmdn/nba.js/blob/master/docs/api/STATS.md#method-reference

// data.teams({
//   year: 2018
// }).then(function(res) {
//   let teams = res.league.standard.filter(team => team.isNBAFranchise);
//   console.log(teams.length);
//   // teams.forEach(team => console.log(team.fullName));
// }).catch(function(err) {
//   console.error(err);
// });



// NBA STATS CLIENT
// let day = { year: 2018, month: 10, day: 1 };
// let game = Object.create(day);
// game.gameId = '0011800012';

// function getGamesByDay(day) {
//   nbaStatsClient.getGames(day)
//     .then(response => {
//       let games = response.sports_content.games.game;
//       console.log(games);
//       return games;
//     })
//     .catch(error => console.log(error))
// }

// function getPlayersByGameId(game) {
//   return nbaStatsClient.getBoxScore(game)
//     .then(response => {
//       let boxScore = response.sports_content.game;
//       let players = boxScore.visitor.players ? boxScore.visitor.players.player : [];
//       console.log(players);
//       return players;     
//     })
//     .catch(error => console.log(error))
// }

// function getPlayersByDay(day) {
//   console.log(`Searching games for day:`);
//   console.log(day);
//   getGamesByDay(day)
//     .then(response => {      
//       let games = response.sports_content.games.game;
//       console.log(`${games.length} founded. Fetching info of the games...`);
//       let promises = games.map(getPlayersByGameId);
//       var results = Promise.all(promises);
//       results.then(data => // or just .then(console.log)
//           console.log(data) // [2, 4, 6, 8, 10]
//       );
//       //console.log(promises);     
//       //games.forEach(game => promises.push(getPlayersByGameId(game)));
//     })
// }

// // getGamesByDay(day)
// getPlayersByGameId(game);