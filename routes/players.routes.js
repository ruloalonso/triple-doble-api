const express = require('express');
const router = express.Router();
const players = require('../controllers/players.controller');
const secure = require('../middlewares/secure.middleware');

router.get('/', /* secure.isAuthenticated ,*/ players.list);
router.get('/:id', /* secure.isAuthenticated, */ players.get);
router.post('/:id/sign', secure.isAuthenticated, players.sign);
// router.post('/:id/cut', /* secure.isAuthenticated, */ players.cut);

module.exports = router;