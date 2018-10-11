const Team = require('../models/team.model');
const Play = require('../models/play.model');
const createError = require('http-errors');

// TODO
module.exports.list = (req, res, next) => {
  Team.find()
    .then(teams => {
      res.json(teams);
    })
    .catch(error => next(error)); 
}