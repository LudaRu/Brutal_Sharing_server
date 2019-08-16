const auth = require("../auth/auth.controllers");

const express = require('express');
const router = express.Router();
const contr = require('./users.controllers');
const ch = require('../../midleware/helperController');

router.route('/')
    .get(contr.getAllUsers);


router.route('/me')
    .get(
        auth.authenticate,
        contr.getMe,
    );


router.route('/:number')
    .get(contr.getByUserId);


router.route('/jwt/:num').get(
    contr.TESTgetJwt,
    auth.generateToken,
    (req, res, next) => {
        ch.sendSuccess(res) ({token: req['token'],user: req.user})
    }
);


module.exports = router;
