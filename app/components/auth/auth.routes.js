const express = require('express');
const router = express.Router();
const contr = require('./auth.controllers');
const passport = require('passport');


router.get('/session', contr.sendNewSessionId);
router.get('/session/:sessionId', contr.findResultBySession);

router.get('/vk',
    // passport.authenticate('vkontakte')
    (req, res, next) => {
        res.redirect(303, '/vk/callback');
    }
);

router.get('/vk/:sessionId',
    (req, res, next) => {
        res.redirect(303, '/vk/callback');
    }
);

router.get('/vk/callback',
    // passport.authenticate('vkontakte', {session: false}),
    contr.generateToken,
    contr.sendToken
);

router.route('/me').get(contr.authenticate, contr.getCurrentUser, contr.getOne);

module.exports = router;
