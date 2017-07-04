var express = require('express');

var router = express.Router();

var env = require('dotenv').config();

var user = require('../models/user');

module.exports = function(passport) {

    router.get('/', passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    router.get('/callback',
        passport.authenticate('facebook', {
            successRedirect: 'back',
            failureRedirect: '/',
            failureFlash: true
        }));

    return router;
};
