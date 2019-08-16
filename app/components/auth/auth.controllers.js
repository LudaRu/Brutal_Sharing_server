const config = require('config');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const crypto = require("crypto");
const passport = require('passport');
const ch = require('../../midleware/helperController');

const tmpSessions = {};

module.exports = {

    /** url=session Сессия **/

    sendNewSessionId: async (req, res, next) => {
        const sessionId = crypto.randomBytes(8).toString("hex");
        tmpSessions[sessionId] = true;

        ch.sendSuccess(res) (sessionId);
    },

    // Проверяем результат авторизации
    findResultBySession: async (req, res, next) => {
        const sessionId = req.params.sessionId;

        ch.sendSuccesOrErrorIf(res, (data) => !!data) (tmpSessions[sessionId]);
        delete tmpSessions[sessionId];
    },


    /** url=vk **/

    passportAuthenticate: async (req, res, next) => {
        passport.authenticate(
            'vkontakte', {callbackURL: config.get('url') + '/auth/vk/callback?id='+req.query.id}
            )(req,res,next);
    },

    // Создание токена
    generateToken: async (req, res, next) => {
        req.token = jwt.sign({id: req.user.id}, config.get('jwt_secret'), {expiresIn: 60 * 120 * 1000});

        // Добавим в хранилище, что бы пользователь
        // мог по запросу (findResultBySession) достать постоянный токен
        tmpSessions[req.query['id']] = req.token;
        next();
    },

    // Отправка в хедере токен
    sendToken: async (req, res, next) => {
        console.log(req.query['id']);
        res.setHeader('x-auth-token', req.token);
        res.redirect(303, req.headers.referer || '')
        // res.status(200).send(req.token);
    },

    authenticate: expressJwt({
        secret: config.get('jwt_secret'),
        getToken: (req) => {
            if (req.headers['x-auth-token']) {
                return req.headers['x-auth-token'];
            }

            throw new Error('x-auth-token not faund in header');
        }
    }),
};
