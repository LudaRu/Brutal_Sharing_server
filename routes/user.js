// const errors = require('restify-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const rjwt = require('restify-jwt-community');
const auth = require('../authenticate');
const config = require('../config');

module.exports = server => {
    server.use(rjwt({ secret: config.JWT_SECRET }));
    server.post('/api/register', registerRout);
    server.post('/api/auth', authRout);
    server.post('/api/test', (req, res, next) => {
        console.log(rjwt({ secret: config.JWT_SECRET }));
        // res.send(rjwt({ secret: config.JWT_SECRET }));
    });
    // server.post('/api/f', (req, res, next) => {console.log(req.body)});
};



registerRout({}, '', '');


/**
 *
 * @param {string} req
 * @param res
 * @param next
 */
const registerRout = (req, res, next) => {
    const { email, password } = req.body;
console.log(req.body);
    const user = {
        email: email,
        password: password,
    };

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async (err, hash) => {
            // Hash Password
            user.password = hash;
            // Save User
            try {
                console.log('user hash', user);
                // const newUser = await user.save();
                res.send(201);
                next();
            } catch (err) {
                console.log(err);
                // return next(new errors.InternalError(err.message));
            }
        });
    });
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const authRout = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Authenticate User
        const user = await auth.authenticate(email, password);

        console.log(user)
        // user.prototype.toJSON = () => {
        //     const ret = {};
        //     const keys = this.keys();
        //     for (const key of keys) {
        //         ret[key] = this.get(key);
        //     }
        //     return ret;
        // };

        let dd= {};
        dd['password'] = '$2b$10$pjiFj8OUMT487fWrNeutAOn0uF/oRt9O5hhv5kN3pNaqm6oZdPcxW';
        dd['email'] = 'log';

        // Create JWT
        const token = jwt.sign(dd, config.JWT_SECRET, {
            expiresIn: '15m'
        });

        const { iat, exp } = jwt.decode(token);
        // Respond with token
        res.send({ iat, exp, token });

        next();
    } catch (err) {
        console.log('err', err);
        // User unauthorized
        // return next(new errors.UnauthorizedError(err));
    }
};

