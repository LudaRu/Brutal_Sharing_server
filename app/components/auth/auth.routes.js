const config = require('config');
const express = require('express');
const router = express.Router();
const contr = require('./auth.controllers');
const User = require('../../models/Users');


// Инициализация временный токен сессии
router.route('/session')
    .get(
        contr.sendNewSessionId,
    );

// Получить постоянный jwt токен, по ключу сессии
router.route('/session/:sessionId')
    .get(
        contr.findResultBySession,
    );

//
router.route('/vk') // ?id = ...
    .get(
        contr.passportAuthenticate,
    );

//
router.route('/vk/callback')
    .get(
        contr.passportAuthenticate,
        contr.generateToken,
        contr.sendToken,
    );

module.exports = router;
