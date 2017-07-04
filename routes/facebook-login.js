var express = require('express');

var router = express.Router();

var env = require('dotenv').config();

var user = require('../models/user');

module.exports = function(passport) {

    router.get('/', passport.authenticate('facebook', { scope: 'email' }));

    router.get('/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: 'back',
            failureFlash: true
        }));

    return router;
};
