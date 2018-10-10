const Player = require('../models/player.model');
const Team = require('../models/team.model');
const PlayerStat = require('../models/player-stats.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  if (req.query.team) {
    Player.find({team: req.query.team})
      .then(players => {
        res.json(players);
      })
  } else if (req.query.owner) {
    Player.find({owner: req.query.owner})
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
    .then(player => {
      if (!player) {
        throw createError(404, 'Player not found');
      } else {
        PlayerStat.findOne({playerId: player.playerId})
          .then((stat => {
            if (!stat) {
              throw createError(404, 'Stat not found');
            } else {
              stat.data.rowSet.forEach((set) => {
                if (set[1] === '2017-18') {
                  player.stats = {};
                  player.stats.pastSeason = parseStats(set);
                }
              })
              res.json(player);
            }
          }))
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
  Player.findByIdAndUpdate(req.params.id, {$set:{owner: req.user._id}})
    .then(player => {
      Team.findOne({owner: req.user._id})
        .then(team => {
          console.log(team)
          team.totalSalaries += player.contracts[0];
          team.save()
            .then(team => {
              console.log('Player signed! New salary cap: ' + (team.salaryCap - team.totalSalaries))
              res.json(player);
            })
        })      
    })
}

module.exports.cut = (req, res, next) => {
  Player.findByIdAndUpdate(req.params.id, {$set:{owner: null}})
    .then(player => {
      Team.findOne({owner: req.user._id})
        .then(team => {
          console.log(team)
          team.totalSalaries =  team.totalSalaries <= 0 ? 0 : team.totalSalaries - player.contracts[0];
          team.save()
            .then(team => {
              console.log('Player cut! New team salary cap: ' + (team.salaryCap - team.totalSalaries))
              res.json(player);
            })
        })      
    })
}

function parseStats(set) {
  let stats = {
    gp: set[6],
    min: set[8],
    oreb: set[18],
    dreb: set[19],
    ast: set[21],
    stl: set[22],
    blk: set[23],
    tov: set[24],
    pf: set[25],
    pts: set[26]
  }
  stats.fpts = calculateFP(stats);
  stats.fptsMin = Math.round(stats.fpts / stats.min * 1000) / 1000;
  return stats;
}

function calculateFP(stats) {
  let plus = stats.oreb + stats.dreb + stats.ast + stats.stl + stats.blk + stats.pts;
  let minus = stats.tov + stats.pf;
  return Math.round((plus - minus) * 100) / 100;
}