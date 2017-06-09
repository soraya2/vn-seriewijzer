var express = require('express');

var router = express.Router();

var env = require('dotenv').config();

var series = require('../models/series');

var request = require('request');

var series2 = require('../data/series.json');

// var serieData = [{ 'name': 'a', 'color': 'black', 'period': 'middeleeuwen' }, { 'name': 'b', 'color': 'blue', 'period': 'victoriaans' }, { 'name': 'c', 'color': 'black', 'period': 'romeins' }];

var filters = {};
var i;
var hobbyAray = [];
var peronalityAray = [];
var moodsArray = [];


// begin soraya
router.post('/', function(req, res) {

    // if (req.body.tagspersoonlijkheid) {

    //     filterPersonality(req.body.tagspersoonlijkheid.sort());
    // }

    // console.log(Array.isArray(req.body.tagshobby) === false);

    // if (Array.isArray(req.body.tagshobby) === false) {
    //     hobbyAray.push(req.body.tagshobby);

    //     return filterHobby(hobbyAray);

    // }
    // if (req.body.tagshobby && Array.isArray(req.body.tagshobby)) {
    //     hobbyAray.push(req.body.tagshobby);

    //     filterHobby(req.body.tagshobby);
    //     // for (i = 0; i < req.body.tagshobby.length; i++) {
    //     //     hobbyAray.push(req.body.tagshobby[i]);
    //     // }


    // }


    var filterdData = [];

    // Get random friends from user account
    var arr = [];
    var randomnumber = Math.floor(Math.random() * series2.length);
    while (arr.length < randomnumber) {
        var randomnumber2 = Math.floor(Math.random() * series2.length);
        if (arr.indexOf(randomnumber2) > -1) {
            continue;
        }
        arr[arr.length] = randomnumber2;
    }
    for (var i = 0; i < arr.length; i++) {
        filterdData.push(series2[arr[i]]);
    }

    // if (req.body.tagsikwil) {

    //     filterMoods([req.body.tagsikwil]);
    // }



    // var elements = Array.from(req.body.country);


    // console.log(Array.isArray(req.body.country));



    // var filterdData = series2.filter(function(series) {

    //     return Object.keys(filters).every(function(keys) {

    //         return filters[keys].some(function(filterOptions) {
    //             // console.log(filterOptions == series[keys]);


    //             for (i; i < series[keys].split(",").length; i++) {
    //                 // console.log(series[keys].split(", ")[i]);

    //                 series[keys].split(",")[i];
    //                 console.log(filters[keys]);


    //                 return filterOptions == series[keys].split(",")[i];
    //             }

    //             // return filterOptions == series[keys];
    //         });
    //     });
    // });



    // console.log(req.user, 'username');

    // res.send('hello');
    res.render('profile', { title: 'Home', data: filterdData, name: req.user.user.facebook.displayName });

    // router.get('/', function(req, res) {

    //     getData(receiveData, '');

    //     function receiveData(data) {
    //         if (req.user !== undefined) {

    //             res.render('profile', { title: 'Home', data: data, name: req.user.user.facebook.displayName });
    //         } else {
    //             res.render('login2');
    //         }
    //     }
    // });

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
function filterPersonality(filterOption) {
    filters.tagspersoonlijkheid = filterOption;


    console.log(filters.tagspersoonlijkheid, "[filterpersoonlijkheid]");
    return filters.tagspersoonlijkheid;
}

function filterHobby(filterOption) {
    filters.tagshobby = filterOption;
    console.log(filters.tagshobby, "[tagshobby]");
    return filters.tagshobby;
}

function filterMoods(filterOption) {
    filters.tagsikwil = filterOption;
    console.log(filters.tagsikwil, "[tagsikwil]");
    return filters.tagsikwil;
}

module.exports = router;
