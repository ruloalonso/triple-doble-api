const express = require('express');
const router = express.Router();
const players = require('../controllers/players.controller');
const secure = require('../middlewares/secure.middleware');

router.get('/', secure.isAuthenticated, players.list);
router.post('/', secure.isAuthenticated, players.create);
router.get('/:id', players.get);
router.delete('/:id', secure.isAuthenticated, players.delete);

module.exports = router;