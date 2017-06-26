var express = require('express'),
    router = express.Router(),
    env = require('dotenv').config(),
    reviewsSchema = require('../models/reviewsschema'),
    user = require('../models/user');

router.get('/', function(req, res) {

    user.findOne({'user.facebook.displayName': 'Shyanta Vleugel'}, function(err, user) {
        reviewsSchema.find({}).sort({ postDate: -1 }).exec(function (err, reviews) {
            console.log(reviews);
            res.render('home', {
                title: 'Vrij Nederland Seriewijzer',
                userData: user,
                reviewData: reviews
            });
        });
    });

});

module.exports = router;
