const Play = require('../models/play.model');
const createError = require('http-errors');

module.exports.get = (req, res, next) => {
  console.log(req.query);
  if (req.query.player) {    
    Play.find({player: req.query.player})
      .then(plays => {
        res.json(plays);
    })
  } else if (req.query.team) {
    Player.find({owner: req.query.team})
      .then(players => {
        res.json(plays);
    })
  } else {    
    Play.find()
      .then(plays => res.json(plays))
      .catch(error => next(error));
  }
}
