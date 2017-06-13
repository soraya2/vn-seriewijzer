var express = require('express');

var request = require('request');

var env = require('dotenv').config();

var user = require('../models/user');

var series = require('../models/series');

var reviewsSchema = require('../models/reviewsschema');

var mongoose = require('mongoose');

var router = express.Router();

var seriesId;

router.get('/:id', function(req, res) {

    //get serie based on serie name
    reviewsSchema.findOne({ "review.seriesName": req.params.id }, function(error, doc) {

        seriesId = req.params.id;

        res.render('detail', { data: doc, title: 'Home' });

    });

});

module.exports = function(io) {

    io.on('connection', function(sockets) {

        sockets.broadcast.on('comment', function(comm) {

            //add comments to  the database based on series name
            reviewsSchema.findOneAndUpdate({ "review.seriesName": seriesId }, {
                "$addToSet": {
                    "comments": comm
                }
            }, { upsert: true }, function(err, document) {
                if (err) {
                    return console.log(err);
                }
            });
            // io.emit('comment', comm);
        });

    });

    return router;
};
