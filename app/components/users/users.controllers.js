const config = require('config');
/** @type {PanningModelType} User */
const User = require('../../models/Users');
console.log(appRoot);
const ch = require(appRoot + '/tools/helperController');

const sessions = {};

module.exports = {
    getMe: async (req, res, next) => {
        // try {
        //     // resolve, reject
        //     const users = await User.find().then(
        //         ch.throwIf(404, 'not found 2', ),
        //         ch.throwError(500, 'sequelize error')
        //     );
        //     res.send(users);
        // } catch (e) {
        //     ch.sendError(res) (e)
        // }
    },

    getByUserId: async (req, res, next) => {
        try {
            await User
                .findById(req.params['userId'])
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
};
