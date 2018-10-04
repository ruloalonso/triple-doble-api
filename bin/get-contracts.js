require('../config/db.config');
const mongoose = require('mongoose');
const Player = require('../models/player.model');
const parse = require('csv-parse');
var fs = require('file-system');

let wins = 0;
let fails = 0;

fs.readFile('./data/contracts.csv', (err, data) => {
  if (err) throw err;
  parse(data, {
    comment: '#'
  }, function(err, output){
    output.shift();
    let players = output.map(player => {
      return {
        firstName: player[1].split('\\')[0].split(' ')[0],
        lastName: player[1].split('\\')[0].split(' ')[1],
        contracts: getContracts(player)
      }
    });
    players.forEach(player => {
      // console.log(player);
      updatePlayer(player)
    });
  })
});

function getContracts(player) {
  let i = 3;
  let contracts = [];
  while (player[i] !== '') {
    let contract = Number(player[i].substr(1));
    contracts.push(contract);
    i++;
  }
  return contracts;
}

function updatePlayer(player) {
  Player.findOneAndUpdate({firstName: player.firstName, lastName: player.lastName}, {$set:{contracts: player.contracts}})
    .then(foundPlayer => {
      if (foundPlayer) {
        console.log('Player fetched from CSV!!! Wins: ' + ++wins);
      } else {
        console.log(`Player not found: ${player.firstName} ${player.lastName}. Fails: ${++fails}`);
      }
      mongoose.connection.close();
    })
    .catch(e => {
      console.error(e);
      mongoose.connection.close();
    });
}
