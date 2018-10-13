const express = require('express');
const router = express.Router();
const league = require('../controllers/leagues.controller');
const team = require('../controllers/teams.controller')
const secure = require('../middlewares/secure.middleware');

router.get('/', league.list);
router.get('/:id', league.get);

router.post('/', secure.isAuthenticated, league.create);
router.post('/:id/draft', secure.isAuthenticated, league.startDraft);
router.post('/:id/turn', secure.isAuthenticated, league.passTurn);
router.post('/:id/join', secure.isAuthenticated, league.join);

router.post('/:id/team', secure.isAuthenticated, team.create);
router.get('/:id/teams', secure.isAuthenticated, team.list);

module.exports = router;
