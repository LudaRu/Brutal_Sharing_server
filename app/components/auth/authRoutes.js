const express = require('express');
const router = express.Router();
const authController = require('./authController');


/** @param {Authenticator} passport */
module.exports = (passport) => {
    /** ���� ��� ������������ ��� ����������� ����� �� */
    router.get('/vkontakte', passport.authenticate('vkontakte'));

    /** �������� �� �� */
    router.get('/vkontakte/callback', passport.authenticate('vkontakte', {
        successRedirect: '/success',
        failureRedirect: '/error'
    }));

    router.get('/error', authController.error);

    router.get('/success', authController.success);
};
