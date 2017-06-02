var express = require('express');
var router = express.Router();
var request = require('request');
var env = require('dotenv').config();
var seriesSchema = require('../models/seriesschema');

router.get('/', function(req, res) {
    getData(receiveData, '');

    function receiveData(data) {

        res.render('index', { data: data, title: 'Home' });

    }

});

function getData(recieve, value) {

    request.get('https://api.themoviedb.org/3/discover/tv?api_key=' + env.parsed.MOVIEDBKEY + '&format=json' + value, function(error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        var data = JSON.parse(body);


        saveData(data, recieve);

    });

}

function saveData(data, recieve) {
    var query = 'data';
    // if the data field exist update it and only add new values to the array so there are no duplicates
    seriesSchema.findOneAndUpdate(query, {
        "$addToSet": {
            "series.data": { $each: data.results }


        }
    }, { upsert: true }, function(err, document) {
        // console.log(document.series.data[0]);

        if (err) return console.log(err);

        recieve(document.series.data[0]);



        // io.sockets.in('timer').emit('time', { info: document.twitter.tweets });


    });


}

module.exports = router;
