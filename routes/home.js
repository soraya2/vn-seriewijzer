var express = require('express'),
    router = express.Router(),
    env = require('dotenv').config(),
    reviewsSchema = require('../models/reviewsschema'),
    user = require('../models/user');

router.get('/', function(req, res) {

    if (req.user) {
        req.session.user = req.user.user.facebook.displayName;
        req.session.email = req.user.user.facebook.email;

        user.findOne({ 'user.facebook.email': req.session.email }, function(err, user) {

            userStatusCheck(res, 'Uitloggen', '/logout', user);
        });
    } else {

        userStatusCheck(res, 'Log In', '/auth/facebook', '');

    }
});

function userStatusCheck(res, status, statusPath, userData) {

    reviewsSchema.find({}).sort({ postDate: -1 }).exec(function(err, reviews) {
        res.render('home', {
            title: 'Vrij Nederland Seriewijzer',
            userData: userData,
            reviewData: reviews,
            userStatus: status,
            userStatusPath: statusPath

        });
    });
}

module.exports = router;
