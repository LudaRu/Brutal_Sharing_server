const config = require('config');
/** @type {PanningModelType} User */
const User = require('../../models/Users');

const ch = require('../../midleware/helperController');

const sessions = {};

module.exports = {
    getMe: async (req, res, next) => {
        res.json(req.user.toObject());
        await User
            .findById(req.user.id)
            .then(
                (user) => {
                    ch.sendSuccess(res) (user.toObject())
                },
                ch.throwError()
            );
    },

    getByUserId: async (req, res, next) => {
        try {
            await User
                .find({__v: req.params['number']})
                .then(
                    ch.sendSuccess(res),
                    ch.throwError()
                );
        } catch (e) {
            ch.sendError(res) (e)
        }
    },

    getAllUsers: async (req, res, next) => {
        const users = await User.find();
        res.send(users);
    },


    TESTgetJwt: async (req, res, next) => {
        await User.findOne({__v: req.params['num']})
            .then(
                (data) => {
                    req.user = data;
                    next();
                },
                ch.throwError()
            );
    }
};
