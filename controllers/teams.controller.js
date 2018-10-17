const Team = require('../models/team.model');
const createError = require('http-errors');
const faker = require('faker');

// TODO
module.exports.create = (req, res, next) => {
  // console.log(req.user);
  let team = new Team();
  team.owner = req.user._id;
  team.name = faker.lorem.word();
  team.city = faker.address.city();
  team.league = req.params.id;
  team.save()
    .then(team => {
      res.json(team);
    })
    .catch(error => next(error)); 
}

module.exports.league = (req, res, next) => {
  Team.find({league: req.params.id})
    .populate('owner')
    .then(teams => {
      res.json(teams);
    })
    .catch(error => next(error)); 
}

module.exports.get = (req, res, next) => {
  Team.findById(req.params.id)
    .populate('owner')
    .then(team => {
      // console.log(team);
      res.json(team);
    })
    .catch(error => next(error)); 
}