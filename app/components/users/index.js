const config = require('config');
const mongoose = require('mongoose');

mongoose.connect(config.get('db'),  { useNewUrlParser: true });

/** @param {Application} app */
module.exports = (app) => {
    app.use('/users', require('./users.routes'));
};


