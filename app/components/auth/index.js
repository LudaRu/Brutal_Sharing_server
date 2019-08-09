const config = require('config');
const passport = require('passport');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

mongoose.connect(config.get('db'),  { useNewUrlParser: true });

/** @param {Application} app */
module.exports = (app) => {
    initPassport(app);
    app.use('/auth', require('./auth.routes'));
};

/** @param {Application} app */
const initPassport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    require('./auth.pasport')(passport);
};

