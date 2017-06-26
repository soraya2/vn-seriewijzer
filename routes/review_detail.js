var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var reviewsSchema = require('../models/reviewsschema.js');

router.get('/:id', function (req, res) {
    console.log(`[Server] Search database for ${req.params.id}`);
    reviewsSchema.findOne({'_id': req.params.id}, function (error, review) {
        res.render('review_detail', {
            data: review
         });
    })
});

router.post('/:id', function(req, res) {
    processUploadForm(req, res);
    res.redirect('/review_overview');
});

function processUploadForm(req, res) {
    var fields = req.body;
    var query = { '_id': req.params.id};
    var options = { new: true };
    var update = {
        user: {
            name:           fields.name,
            email:          fields.email
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
    };
    reviewsSchema.findOneAndUpdate(query, update, options, function(err, review) { // Error handling
            if (err) {
                console.log('[Server] ERROR: Cannot update form information to database');
                console.log(err);
            } else {
                console.log('[Server] Form updated in database');
            }
        });
};

module.exports = router;
