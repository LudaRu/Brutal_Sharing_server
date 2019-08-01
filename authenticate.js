const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');
// const User = mongoose.model('User');

exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Get user by email
            // const user = await User.findOne({ email });

            const userDB = {
                password: '$2b$10$pjiFj8OUMT487fWrNeutAOn0uF/oRt9O5hhv5kN3pNaqm6oZdPcxW',
                email: 'log',
            };

            // Match Password
            bcrypt.compare(password, userDB.password, (err, isMatch) => {
                if (err) throw err;
                if (!isMatch) throw 'Password did not match';
                resolve(userDB);
            });
        } catch (err) {
            // Email not found or password did not match
            reject('Authentication Failed');
        }
    });
};
