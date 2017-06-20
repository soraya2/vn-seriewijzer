var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var reviewsSchema = require('../models/reviewsschema.js');

// Connect to main database
mongoose.connect(process.env.MAINDB);

router.get('/', function (req, res) {
  reviewsSchema.find({}, 'review', function(err, reviews){
        if (err) {
          console.log(err);
        } else {
            console.log(`[Server] Retrieved ${reviews.length} reviews from database`);
            res.render('review_overview', { data: reviews });
        }
    })
});

module.exports = router;
