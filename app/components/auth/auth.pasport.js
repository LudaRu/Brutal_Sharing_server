const config = require('config');
const VkStrategy = require('passport-vkontakte').Strategy;
const User = require('../../models/Users');

/** @param {Authenticator} passport*/
module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new VkStrategy({
            clientID: config.get('vk.id'),
            clientSecret: config.get('vk.secret'),
            callbackURL: config.get('url') + '/auth/vk/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => {
                User.findOne({'vk.id': profile.id}, (err, user) => {
                    if(err)
                        return done(err);
                    if(user)
                        return done(null, user); // Уже пользователь есть
                    else {
                        const newUser = new User(); // Создаем нового
                        mappingVkUser(newUser, profile);
                        newUser.save( err => {
                            if (err) throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

    /**
     * FIXME Надо нормальный мапинг сделать!!!
     */
    const mappingVkUser = (User, profile) => {
        User.vk.id = profile.id;
        User.vk.name.fullName = profile.name.givenName + ' ' + profile.name.familyName;
        User.vk.name.givenName = profile.name.givenName;
        User.vk.name.familyName = profile.name.familyName;
        User.vk.photo = profile.photos[0].value;
    }
};
