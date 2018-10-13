const express = require('express');
const router = express.Router();
const teams = require('../controllers/teams.controller');
const secure = require('../middlewares/secure.middleware');

router.get('/:id', teams.list);
router.post('/:id', secure.isAuthenticated, teams.create);

module.exports = router;
