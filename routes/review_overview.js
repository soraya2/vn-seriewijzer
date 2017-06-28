var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var reviewsSchema = require('../models/reviewsschema.js');

router.get('/', function (req, res) {
 reviewsSchema.find({}, 'review').sort({ postDate: -1 }).exec(function (err, reviews) {
        if (err) {
          console.log(err);
        } else {
            console.log(`[Server] Retrieved ${reviews.length} reviews from database`);
            res.render('review_overview', { data: reviews});
        }
    })
});

module.exports = function(io) {
    io.on('connection', function(socket) {
        socket.emit('connection');
        console.log('[Server] Connected to client');

        socket.on('new update', function () {
            console.log('Notification received');
            io.sockets.emit('update');
            // io.broadcast.emit('notify');
        })
    });
    return router;
};
