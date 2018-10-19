const Play = require('../models/play.model');
const createError = require('http-errors');

module.exports.get = (req, res, next) => {
  Play.find({player: req.params.playerId})
    .then(plays => {
      console.log(plays);
      res.json(plays);
    })
    .catch(error => next(error)); 
}