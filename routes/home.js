var express = require('express'),
    router = express.Router(),
    env = require('dotenv').config(),
    reviewsSchema = require('../models/reviewsschema'),
    user = require('../models/user');

router.get('/', function(req, res) {

if (req.session.user) {
    user.findOne({'user.facebook.email': 'req.session.email' }, function(err, user) {
        console.log(user);
        reviewsSchema.find({}).sort({ postDate: -1 }).exec(function (err, reviews) {
            res.render('home', {
                title: 'Vrij Nederland Seriewijzer',
                userData: user,
                reviewData: reviews
            });
        });
    });
} else {
    reviewsSchema.find({}).sort({ postDate: -1 }).exec(function (err, reviews) {
        res.render('home', {
            title: 'Vrij Nederland Seriewijzer',
            userData: '',
            reviewData: reviews
        });
    });
}



});

module.exports = router;
