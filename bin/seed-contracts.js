require('../config/db.config');
const mongoose = require('mongoose');
const Player = require('../models/player.model');
const parse = require('csv-parse');
var fs = require('file-system');

const input = '#Welcome\n"1","2","3","4"\n"a","b","c","d"'

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

// ///////////////

// for (let i = -1; ++i < numUsers;) {  

//   let password = faker.internet.password();

//   new User({
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: password,
//     image: password,
//     age: 25,
//     genre: 'female',
//     active: true,
//     token: '2fixdi6u8v9ekcu3ix6u1'
//   }).save()
//     .then(user => {
//       console.log(`${user.firstName} correctly added to the collection`);
//       mongoose.connection.close();
//     })
//     .catch(e => {
//       console.error(e);
//       mongoose.connection.close();
//     });
// }