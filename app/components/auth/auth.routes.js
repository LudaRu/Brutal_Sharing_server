const express = require('express');
const router = express.Router();
const contr = require('./auth.controllers');
const VkStrategy = require('passport-vkontakte').Strategy;
const passport = require('passport');

//
router.get('/vk', passport.authenticate('vkontakte'));

//
router.get('/vk/callback',
    passport.authenticate('vkontakte', {session: false}),
    contr.generateToken,
    contr.sendToken
);

//
router.route('/me').get(contr.authenticate, contr.getCurrentUser, contr.getOne);

module.exports = router;
