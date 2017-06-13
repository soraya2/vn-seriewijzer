var express = require('express');

var request = require('request');

var env = require('dotenv').config();

var user = require('../models/user');

var series = require('../models/series');

var reviewsSchema = require('../models/reviewsschema');

var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res) {
    // getData(receiveData, req.params.id);

    reviewsSchema.findOne({ "review.seriesName": req.params.id }, function(error, doc) {
        console.log(doc.review);

        // console.log(testData.review.reviewPlot);

        res.render('detail', { data: doc, title: 'Home' });


    });

});




module.exports = router;
