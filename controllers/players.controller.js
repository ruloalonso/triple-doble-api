const Player = require('../models/player.model');
const Team = require('../models/team.model');
const Play = require('../models/play.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  if (req.query.available) {    
    Player.find({owner: {$exists: req.query.available === "true" ? false : true}})
      .then(players => {
        res.json(players);
      })
  } else if (req.query.team) {
    Player.find({owner: req.query.team})
      .populate('owner')
      .then(players => {
        res.json(players);
      })
  } else {    
    Player.find()
      .then(players => res.json(players))
      .catch(error => next(error));
  }  
}

module.exports.get = (req, res, next) => {
  Player.findById(req.params.id)
    .populate('owner')
    .then(player => {
      if (!player) {
        throw createError(404, 'Player not found');
      } else {
        Play.find({player: player._id})
          .then(plays => {
            if (plays) player.plays = plays;
            res.json(player);
          })
          .catch(error => {
            next(error);
          });
      }
    })
    .catch(error => {
      next(error);
    });
}

module.exports.sign = (req, res, next) => {
  Player.findById(req.params.id)
    .then(player => {
      Team.findOne({owner: req.user._id, league: req.body.leagueId})
        .then(team => {
          player.owner = team._id;
          player.position = 'B';
          player.save()
            .then(player => {
              res.status(201).json(player);              
            })
          })    
        })
    .catch(error => {
      next(error);
    });
}

module.exports.position = (req, res, next) => {
  Player.findByIdAndUpdate(req.params.id, {$set:{position: req.params.position}})
    .then(player => res.status(201).json(player))
    .catch(error => {
      next(error);
    })
}

module.exports.cut = (req, res, next) => {
  Player.findByIdAndUpdate(req.params.id, {$set:{owner: null}})
    .then(player => res.json('Player cut!'))
    .catch(error => {
      next(error);
    })
}
