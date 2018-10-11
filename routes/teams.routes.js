const express = require('express');
const router = express.Router();
const teams = require('../controllers/teams.controller');

router.get('/', teams.list);

module.exports = router;