var express = require('express');
var router = express.Router();
var request = require('request');
var env = require('dotenv').config();
var reviewsSchema = require('../models/reviewsschema');

router.post('/data', function(req, res) {

    reviewsSchema.find({}, function(err, reviews) {

        res.send(reviews);
    });

});

router.post('/', function(req, res) {

    reviewsSchema.find({}, function(err, reviews) {

        res.send(reviews);
    });

});

module.exports = router;
