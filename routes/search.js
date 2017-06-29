var express = require('express');
var router = express.Router();
var request = require('request');
var env = require('dotenv').config();
var reviewsSchema = require('../models/reviewsschema');

router.get('/', function(req, res) {

    reviewsSchema.find({}, function(err, reviews) {
        console.log(reviews);
        res.send(reviews);
    });


    // res.render('index', { title: 'Home' });

});


router.post('/', function(req, res) {

    reviewsSchema.find({}, function(err, reviews) {
        console.log(reviews);
        res.send(reviews);
    });

    // res.render('index', { title: 'Home' });

});



module.exports = router;
