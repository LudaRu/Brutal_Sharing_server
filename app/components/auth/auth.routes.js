const express = require('express');
const router = express.Router();
const contr = require('./auth.controllers');
const passport = require('passport');


router.get('/session', contr.sendNewSessionId);

router.post('/vk', (req, res, next) => {console.log(req.body); next();},
    passport.authenticate('vkontakte'));

router.get('/vk/callback',
    passport.authenticate('vkontakte', {session: false}),
    contr.generateToken,
    contr.sendToken
);

router.route('/me').get(contr.authenticate, contr.getCurrentUser, contr.getOne);

module.exports = router;
