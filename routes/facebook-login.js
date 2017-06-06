var express = require('express');

var router = express.Router();

var request = require('request');

var env = require('dotenv').config();

module.exports = function(passport) {

    router.get('/', passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    router.get('/callback',
        passport.authenticate('facebook', {
            successRedirect: '/auth/facebook/profile',
            failureRedirect: '/'
        }));

    router.get('/profile', function(req, res) {
        console.log(req.user.user.facebook.displayName, 'user');

        res.render('profile', { title: 'Home', name: req.user.user.facebook.displayName });

    });
    return router;
};
