const parse = require('csv-parse');
var fs = require('file-system');
const Player = require('./models/player.model');
const playersController = require('./controllers/players.controller');

const input = '#Welcome\n"1","2","3","4"\n"a","b","c","d"'

fs.readFile('./data/contracts.csv', (err, data) => {
  if (err) throw err;
  parse(data, {
    comment: '#'
  }, function(err, output){
    //console.log(output[1]);
    output.shift();
    let players = output.map(player => {
      return {
        firstName: player[1].split('\\')[0].split(' ')[0],
        lastName: player[1].split('\\')[0].split(' ')[1],
        team : player[2],
        contracts: getContracts(player)
      }
    });
    //console.log(players[0]);
    savePlayer(players[0]);
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
  //console.log('hola!')
  newPlayer = new Player(player);
  console.log(newPlayer);
  newPlayer.save(function (error) {
    console.log('Error --> ', error);
  })
}

