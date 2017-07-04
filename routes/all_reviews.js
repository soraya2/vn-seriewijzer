var express = require('express');
var router = express.Router();
var request = require('request');
var env = require('dotenv').config();
var reviewsSchema = require('../models/reviewsschema');

module.exports = function(io) {

    router.get('/', function(req, res) {

        if (req.user) {

            userStatusCheck(res, 'Uitloggen', '/logout');

        } else {

            userStatusCheck(res, 'Log In', '/auth/facebook');
        }




        io.on('connection', function(socket) {
            console.log('test');

            socket.emit('get reviews', {
                dataURL: process.env.SEARCHURL




                // process.env.SEARCHURL;
            });
        });
    });



    function userStatusCheck(res, status, statusPath) {

        reviewsSchema.find({}, null, { sort: '-date' }, function(err, reviews) {
            res.render('all_reviews', {
                title: 'Alle Recensies',
                reviewData: reviews,
                userStatus: status,
                userStatusPath: statusPath

            });
        });
    }

    return router;
};
