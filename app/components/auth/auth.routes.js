const express = require('express');
const router = express.Router();
const contr = require('./auth.controllers');
const VkStrategy = require('passport-vkontakte').Strategy;
const passport = require('passport');

//
router.post('/vk',
    (req, res, next) => {
    console.log(req.body)
        next();
    },
    passport.authenticate('vkontakte'));

router.get('/initSession', contr.sendNewSessionId);

//
router.get('/vk/callback',
    passport.authenticate('vkontakte', {session: false}),
    contr.generateToken,
    contr.sendToken
);

//
router.route('/me').get(contr.authenticate, contr.getCurrentUser, contr.getOne);

module.exports = router;
