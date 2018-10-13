const Team = require('../models/team.model');
const createError = require('http-errors');
const faker = require('faker');

// TODO
module.exports.create = (req, res, next) => {
  let team = new Team();
  team.owner = req.user._id;
  team.name = faker.lorem.word();
  team.city = faker.address.city();
  team.league = req.params.id;
  console.log(team);
  team.save()
    .then(team => {
      res.json(team);
    })
    .catch(error => next(error)); 
}

module.exports.list = (req, res, next) => {
  Team.find({league: req.params.id})
    .then(team => {
      res.json(team);
    })
    .catch(error => next(error)); 
}