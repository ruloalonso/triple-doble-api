const express = require('express');
const router = express.Router();
const plays = require('../controllers/plays.controller');
const secure = require('../middlewares/secure.middleware');

router.get('/', plays.get);

module.exports = router;
