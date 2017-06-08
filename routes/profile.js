var express = require('express');

var router = express.Router();

var env = require('dotenv').config();

var series = require('../models/series');

var request = require('request');

var series2 = require('../data/series.json');

var serieData = [{ 'name': 'a', 'color': 'black', 'period': 'middeleeuwen' }, { 'name': 'b', 'color': 'blue', 'period': 'victoriaans' }, { 'name': 'c', 'color': 'black', 'period': 'romeins' }];

var filters = {};

// begin soraya
router.get('/', function(req, res) {

    getData(receiveData, '');

    function receiveData(data) {
        if (req.user !== undefined) {

            res.locals.user = req.user.user.facebook.displayName;

            res.render('profile', { title: 'Home', data: data, name: req.user.user.facebook.displayName });
        } else {
            res.render('login2');
        }
    }
});

router.post('/', function(req, res) {

    if (req.body.selected_period) {
        filterColor([req.body.selected_period]);
    }

    if (req.body.country) {
        filterLanguage([req.body.country]);
    }

    var filterdData = series2.filter(function(series) {
        return Object.keys(filters).every(function(keys) {

            return filters[keys].some(function(filterOptions) {

                return filterOptions == series[keys];
            });
        });
    });

    // console.log(req.user, 'username');
    res.render('profile', { title: 'Home', data: filterdData, name: 'sor' });

});

function getData(recieve, value) {
    request.get('https://api.themoviedb.org/3/discover/tv?api_key=' + env.parsed.MOVIEDBKEY + '&format=json&page=2' + value, function(error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
        }
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        saveData(JSON.parse(body), recieve);
    });
}

function saveData(data, recieve) {
    var query = 'data';
    // If the data field exist update it and only add new values to the array so there are no duplicates
    series.findOneAndUpdate(query, {
        $addToSet: {
            'series': { $each: data.results }
        }
    }, { upsert: true }, function(err, document) {
        if (err) {
            return console.log(err);
        }

        recieve(series2);
    });
}

// add object array per filter
function filterColor(filterOption) {
    filters.tijdperk = filterOption;
    return filters.tijdperk;
}

function filterLanguage(filterOption) {
    filters.land = filterOption;
    return filters.land;
}

module.exports = router;
