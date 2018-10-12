const League = require('../models/league.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  League.find()
    .then(leagues => {
      if (!leagues.length) {
        throw createError(404, 'No leagues created yet');
      } else {
        res.json(leagues);
      }
    })
    .catch(error => next(error)); 
}

module.exports.get = (req, res, next) => {
  League.findById(req.params.id)
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
    users: [req.user._id]
  })
  league.save()
    .then(league => {
      res.status(201).json('League created! League: ' + league._id)
    })
    .catch(error => next(error));
}

module.exports.join = (req, res, next) => {
  League.findById(req.params.id)
    .then(league => {
      console.log(league);
      if(league.users.length >= league.maxUsers) {
        throw createError(404, 'This league already reached the max number of users');
      } else {
        league.users.push(req.user._id);
        league.save()
          .then(response => {
            res.status(201).json('Congratulations! you joined the league: ' + league._id)
          })
      }
    })
}

module.exports.startDraft = (req, res, next) => {
  League.find()
    .then(leagues => {
      let league = leagues[0];
      league.status = "draft";
      league.save()
        .then(response => {
          res.status(201).json('Draft sarted!')
        })
    })
    .catch(error => next(error));  
}

module.exports.startSeason = (req, res, next) => {
  League.find()
    .then(leagues => {
      let league = leagues[0];
      league.status = "season";
      league.save()
        .then(response => {
          res.status(201).json('Season sarted!')
        })
    })
    .catch(error => next(error));  
}

module.exports.passTurn = (req, res, next) => {
  League.find()
    .then(leagues => {
      let league = leagues[0];
      if (league.status !== "draft") {
        res.status(404).json('Its not draft time!')
      } else {
        if (league.turn === league.maxUsers) {
          league.turn = 1;
          league.round++;
          if (league.round > league.maxPlayers) {
            // SEASON START
            league.status = "season";
            league.save()
              .then(response => {
                console.log(response)
                res.status(201).json('Turn passed! Season is ready to start!')
              })
          } else {
            res.status(201).json('Turn passed! Round: ' + league.round + ' Turn: ' + league.turn)
          }          
        } else {
          league.turn++;
          res.status(201).json('Turn passed! Round: ' + league.round + ' Turn: ' + league.turn)
        }      
      }

      league.save()
        .then(response => {
          res.status(201).json('Draft sarted!')
        })
    })
    .catch(error => next(error));  
}
