const express = require('express');
const router = express.Router();
const contr = require('./auth.controllers');
const passport = require('passport');
const User = require('../../models/Users');
const ch = require(appRoot + '/tools/helperController');

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


// router.route('/jwt/:_id').get(
//     (req, res, next) => {
//         User.findById(req.params['_id'])
//             .then(
//                 (data) => {
//                     req.user = data;
//                     next();
//                 },
//                 ch.throwError()
//             );
//
//     },
//     contr.generateToken,
//     (req, res, next) => {
//         ch.sendSuccess(res)(req['token'])
//     }
// );

router.route('/jwt/:num').get(
    (req, res, next) => {
        User.find({__v: req.params['num']})
            .then(
                (data) => {
                    req.user = data;
                    next();
                },
                ch.throwError()
            );

    },
    contr.generateToken,
    (req, res, next) => {
        ch.sendSuccess(res)({req['token'],user: req.user})
    }
);

module.exports = router;
