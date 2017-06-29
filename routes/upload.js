var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var reviewsSchema = require('../models/reviewsschema.js');

// Connect to main database
mongoose.connect(process.env.MAINDB);

router.get('/', function(req, res) {
    res.render('upload');
});

router.post('/', function(req, res) {
    console.log('New form recieved');
    processUploadForm(req, res);
    res.redirect('/review_overview');
});

function processUploadForm(req, res) {
    var fields = req.body;
    console.log(fields);
    // Put incoming form field data into a new model in the database
    reviewsSchema.create({
        user: {
            name:           fields.name,
            email:          fields.email,
            postDate:       fields.postDate
        },
        review: {
            seriesName:     fields.seriesName,
            region:         fields.regionCode,
            startYear:      fields.startingYear,
            endYear:        fields.endYear,
            genre:          fields.genre,
            platform:       fields.platform,
            period:         fields.period,
            persona:        fields.persona,
            hobby:          fields.hobby,
            mood:           fields.mood,
            ageRestriction: fields.ageRestriction,
            seasons:        fields.seasons,
            episodes:       fields.episodes,
            duration:       fields.duration,
            actors:         fields.actors,
            producers:      fields.producers,
            imdbRating:     fields.imdbRating,
            trailerURL:     fields.trailerURL,
            imgURL:         fields.imgURL,
            reviewPlot:     fields.reviewPlot,
            reviewTitle:    fields.reviewTitle,
            reviewIntro:    fields.reviewIntro,
            reviewBody:     fields.reviewBody,
            reviewRating:   fields.reviewRating
        }
    }, function(err) { // Error handling
        if (err) {
            console.log('[Server] ERROR: Cannot add form information to database');
            console.log(err);
        } else {
            console.log('[Server] New review saved to database');
        }
    });
};


module.exports = router;
