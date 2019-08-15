const express = require('express');
const router = express.Router();
const contr = require('./users.controllers');
const passport = require('passport');
const ch = require(appRoot + '/tools/helperController');

router.get('/', contr.getAllUsers);
router.get('/me', contr.getMe);
router.get('/:userId', contr.getByUserId);
router.get('/jwt/:token',
    (req, res, next) => {
        User
            .findById(req.params['token'])
            .then(
                ch.sendSuccess(res),
                ch.throwError()
            );
    },
);
// router.get('/session/:sessionId', contr.findResultBySession);

module.exports = router;
