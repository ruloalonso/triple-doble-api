const Player = require('../models/player.model');
const PlayerStat = require('../models/player-stats.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  Player.find()
    .then(players => res.json(players))
    .catch(error => next(error));
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
                  console.log('stats found!!')
                  player.stats = {};
                  player.stats.pastSeason = {
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
                  };
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

module.exports.lastSeasonStats = (req, res, next) => {
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
              let stats = {}
              stat.data.rowSet.forEach((set) => {
                if (set[1] === '2017-18') {
                  stats = {
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
                  };
                }
              })
              res.json(stats);
            }
          }))
      }
    })
    .catch(error => {
      next(error);
    });
}