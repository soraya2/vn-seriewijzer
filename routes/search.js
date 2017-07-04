var express = require('express');
var router = express.Router();
var request = require('request');
var env = require('dotenv').config();
var reviewsSchema = require('../models/reviewsschema');

module.exports = function(io) {
    router.post('/data', function(req, res) {

        reviewsSchema.find({}, function(err, reviews) {
            // console.log(reviews);
            res.send(reviews);
        });

        // io.on('connection', function(socket) {

  //     socket.emit('get reviews', {
  //         dataURL: process.env.SEARCHURL




  //         // process.env.SEARCHURL;
  //     });
  // });


        // res.render('index', { title: 'Home' });

    });



    // cb(io);
    return router;

};



router.post('/', function(req, res) {

    reviewsSchema.find({}, function(err, reviews) {
        // console.log(reviews);
        res.send(reviews);
    });

    // res.render('index', { title: 'Home' });

});
