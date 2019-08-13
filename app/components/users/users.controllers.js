const config = require('config');
/** @type {PanningModelType} User */
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const crypto = require("crypto");

const sessions = {};

module.exports = {

    getAllUsers: async (req, res, next) => {
        const users = await User.find();
        res.send(users);
    },
};
