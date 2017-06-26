var express = require('express');
var router = express.Router();
var request = require('request');
var env = require('dotenv').config();
var reviewsSchema = require('../models/reviewsschema')

router.get('/', function(req, res) {
    reviewsSchema.find({}, null, {sort: '-date'}, function (err, reviews) {
        res.render('all_reviews', {
            title: 'Alle Recensies',
            reviewData: reviews
        });
    });
});

module.exports = router;
