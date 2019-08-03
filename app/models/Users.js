const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    vk: {
        id: String,
        token: String,
        name: {
            fullName: String,
            givenName: String,
            familyName: String,
        },
        photo: String,
    }
});

userSchema.statics = {

};

module.exports = mongoose.model('Users', userSchema);