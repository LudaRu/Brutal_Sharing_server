const express = require('express');
const router = express.Router();
const contr = require('./users.controllers');
const passport = require('passport');


router.get('/', contr.getAllUsers);
// router.get('/session/:sessionId', contr.findResultBySession);

module.exports = router;
