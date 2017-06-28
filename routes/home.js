var express = require('express'),
    router = express.Router(),
    env = require('dotenv').config(),
    reviewsSchema = require('../models/reviewsschema'),
    user = require('../models/user');

router.get('/', function(req, res) {

// Change 'Shyanta Vleugel' to req.session.email

    user.findOne({'user.facebook.email': 'soraya.02.11@hotmail.com' }, function(err, user) {
        reviewsSchema.find({}).sort({ postDate: -1 }).exec(function (err, reviews) {
            res.render('home', {
                title: 'Vrij Nederland Seriewijzer',
                userData: user,
                reviewData: reviews
            });
        });
    });

});

module.exports = router;
