const League = require('../models/league.model');
const createError = require('http-errors');
const faker = require('faker');

module.exports.list = (req, res, next) => {
  League.find()
    .populate('admin')
    .populate('users')
    .then(leagues => {
      res.json(leagues);
    })
    .catch(error => next(error)); 
}

module.exports.get = (req, res, next) => {
  League.findById(req.params.id)
    .populate('users')
    .populate('admin')
    .then(league => {
      if (!league) {
        throw createError(404, 'League not found');
      } else {
        res.json(league);
      }
    })
    .catch(error => next(error)); 
}

module.exports.create = (req, res, next) => {
  let league = new League({
    admin: req.user._id,
    users: [req.user._id],
    name: req.body.name ? req.body.name : faker.company.companyName()
  })
  league.save()
    .then(league => {
      res.status(201).json(league)
    })
    .catch(error => next(error));
}

module.exports.join = (req, res, next) => {
  League.findById(req.params.id)
    .then(league => {
      // console.log(league);
      if(league.users.length >= league.maxUsers) {
        throw createError(404, 'This league already reached the max number of users');
      } else if (league.users.includes(req.user._id)) {
        throw createError(404, 'You are already in the league');
      } else {
        league.users.push(req.user._id);
        league.save()
          .then(response => {
            res.status(201).json(league);
          })
      }
    })
}

module.exports.startDraft = (req, res, next) => {
  League.findById(req.params.id)
    .then(league => {
      league.status = "draft";
      league.save()
        .then(league => {
          res.status(201).json(league)
        })
    })
    .catch(error => next(error));  
}

module.exports.startSeason = (req, res, next) => {
  League.findById(req.params.id)
    .then(league => {
      league.status = "season";
      league.save()
        .then(league => {
          res.status(201).json(league)
        })
    })
    .catch(error => next(error));  
}

module.exports.passTurn = (req, res, next) => {
  League.findById(req.params.id)
    .then(league => {
      if (league.status !== "draft") {
        res.status(404).json('Its not draft time!')
      } else {
        if (league.turn === league.maxUsers) {
          league.turn = 1;
          league.round++;
          if (league.round > league.maxPlayers) {
            league.status = "season";
            league.save()
              .then(league => {
                res.status(201).json(league)
              })
          } else {
            // league.turn++;
            league.save()
              .then(league => {
                res.status(201).json(league)
              })
          }          
        } else {
          league.turn++;
          league.save()
            .then(league => {
              // console.log(league)
              res.status(201).json(league)
            })
        }      
      }
    })
    .catch(error => next(error));  
}
