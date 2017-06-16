var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var reviewsSchema = require('../models/reviewsschema.js');

// Connect to main database
mongoose.connect(process.env.MAINDB);

router.get('/:id', function (req, res) {
    console.log('[Server] Search DB for ' + req.params.id);
    reviewsSchema.findOne({'review.reviewTitle': req.params.id}, function (error, review) {
        console.log(review);
        res.render('review_detail', { data: review });
    })

});

module.exports = router;
