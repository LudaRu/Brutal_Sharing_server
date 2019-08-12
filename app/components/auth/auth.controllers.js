const config = require('config');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const crypto = require("crypto");

const sessions = {};

module.exports = {
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDU2Y2VkZjhjZDMzMjZmNDZiOTIxMiIsImlhdCI6MTU2NTYxNTAyNSwiZXhwIjoxNTcyODE1MDI1fQ.F2FNKHnVFgs8EJIXaUqXi-WTzzsqZwFRa0bxLk90SY0

    sendNewSessionId: (req, res, next) => {
        // res.setHeader('user-session-id',  );
        const token = crypto.randomBytes(8).toString("hex");
        sessions[token] = undefined;
        console.log('send',sessions);
        res.json(token);
    },

    // Проверяем результат авторизации в вк
    findResultBySession: (req, res, next) => {
        const sessionId = req.params['sessionId'];
        console.log('find sessions[sessionId]', sessions[sessionId]);
        res.json(sessions[sessionId] || undefined);
        delete sessions[sessionId]
        // res.setHeader('user-session-id',  );
    },

    authenticate: expressJwt({
        secret: config.get('jwt_secret'),
        getToken: (req) => {
            if (req.headers['x-auth-token']) {
                return req.headers['x-auth-token'];
            }
            return null;
        }
    }),

    generateToken: (req, res, next) => {
        req.token = jwt.sign({id: req.user.id}, config.get('jwt_secret'), {expiresIn: 60 * 120 * 1000});
        sessions[]
        next();
    },

    sendToken: (req, res, next) => {
        res.setHeader('x-auth-token', req.token);
        console.log('send', sessions);
        res.redirect(303, req.headers.referer)
        // res.status(200).send(req.token);
    },

    getCurrentUser: (req, res, next) => {
        User.findById(req.user.id, (err, user) => {
            if (err) next(err);

            req.user = user;
            next();
        });
    },

    getOne: (req, res) => {
        res.json(req.user.toObject())
    },

};
