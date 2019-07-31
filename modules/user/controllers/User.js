// import jwt from 'jsonwebtoken';
import User from '../models/User';

module.exports = {
    
    create: (req, res, next) => {
        User.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "User added successfully!!!", data: null});

        });
    },

};