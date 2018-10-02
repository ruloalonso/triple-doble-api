const Player = require('../models/player.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

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
        res.json(player);
      }
    })
    .catch(error => {
      next(error);
    });
}

module.exports.create = (req, res, next) => {
  const player = new Player(req.body);

  player.save()
    .then(player => res.status(201).json(player))
    .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  Player.findOneAndDelete({_id: req.params.id})
    .then(player => {
      if (!player) {
        throw createError(404, 'Player not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
}