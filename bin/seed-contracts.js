require('../config/db.config');
const mongoose = require('mongoose');
const Player = require('../models/player.model');
const parse = require('csv-parse');
var fs = require('file-system');

fs.readFile('./data/contracts.csv', (err, data) => {
  if (err) throw err;
  parse(data, {
    comment: '#'
  }, function(err, output){
    //console.log(output[1]);
    output.shift();
    let players = output.map(player => {
      return new Player({
        firstName: player[1].split('\\')[0].split(' ')[0],
        lastName: player[1].split('\\')[0].split(' ')[1],
        team : player[2],
        contracts: getContracts(player)
      })
    });
    //console.log(players[0]);
    players.forEach(player => savePlayer(player));
  })
});

getContracts = function(player) {
  let i = 3;
  let contracts = [];
  while (player[i] !== '') {
    let contract = Number(player[i].substr(1));
    contracts.push(contract);
    i++;
  }
  return contracts;
}

savePlayer = function(player) {
  newPlayer = new Player(player);
  newPlayer.save()
    .then(player => {
      console.log(`${player.firstName} ${player.lastName} correctly added to the collection`);
      mongoose.connection.close();
    })
    .catch(e => {
      console.error(e);
      mongoose.connection.close();
    });
}
