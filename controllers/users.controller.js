const User = require('../models/user.model');
const Team = require('../models/team.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        throw createError(409, `User with name ${req.body.name} already exists`);
      } else {
        user = new User({name: req.body.name, password: req.body.password, email: req.body.email});
        user.save()
          .then(user => {
            res.status(201).json(user);
          })
          .catch(error => {
            next(error)
          });
      }
    })
    .catch(error => next(error));
}
