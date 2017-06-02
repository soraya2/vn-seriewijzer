var express = require('express');
var router = express.Router();
var request = require('request');
var env = require('dotenv').config();

router.get('/', function(req, res) {
    getData(receiveData, '');

    function receiveData(data) {

        res.render('index', { data: data, title: 'Home' });

    }

});

function getData(recieve, value) {

    request.get('https://api.themoviedb.org/3/discover/tv?api_key=' + env.parsed.MOVIEDBKEY + '&format=json' + value, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        var data = JSON.parse(body);
        recieve(data);
        console.log(env.parsed);
    });

}

module.exports = router;
