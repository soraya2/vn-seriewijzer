var express = require('express'),
    router = express.Router(),
    env = require('dotenv').config(),
    reviewsSchema = require('../models/reviewsschema'),
    user = require('../models/user');

router.get('/', function(req, res) {

    user.findOne({'user.facebook.displayName': 'Shyanta Vleugel'}, function(err, user) {
        reviewsSchema.find({}, function(err, reviews) {
            console.log(reviews);
            res.render('home', {
                title: 'Home',
                userData: user,
                reviewData: reviews
            });
        });
    });

});

module.exports = router;
