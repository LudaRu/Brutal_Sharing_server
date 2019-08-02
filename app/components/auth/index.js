const VkStrategy = require('passport-vkontakte').Strategy;
const passport = require('passport');
const routes =  require('./authRoutes');

/** @param {Application} app */
module.exports = (app) => {
    init(app);
    app.use('/auth', routes(passport));
};

/** @param {Application} app */
const init = (app) => {
    // Настройка паспорта
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new VkStrategy({
            clientID:     '7079314', // ID приложения
            clientSecret: 'uHxFinKlSOWmoyHgyAfy', // Защищённый ключ
            callbackURL:  "http://127.0.0.1:3000/auth/vkontakte/callback" // Доверенный redirect URI:
        },
        (accessToken, refreshToken, params, profile, done) => {
            return done(false, {});
        }
    ));
};

