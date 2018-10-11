const League = require('../models/league.model');
const createError = require('http-errors');

module.exports.get = (req, res, next) => {
  League.find()
    .then(leagues => {
      res.json(leagues[0]);
    })
    .catch(error => next(error)); 
}

module.exports.create = (req, res, next) => {
  League.find()
    .then(leagues => {
      console.log
      if (!!leagues.length) {
        throw createError(404, 'Already exists a league');
      } else {
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
    })
    .catch(error => next(error));  
}

module.exports.apply = (req, res, next) => {
  // TODO
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
