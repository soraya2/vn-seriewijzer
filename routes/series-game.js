// Needed requires for this feature
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Reviews = require('../models/reviewsschema');
var User = require('../models/user');

// Global variables config to make the game possible
var reviewArr;
var hobby = [];
var mood = [];
var persona = [];

Reviews.find("review", function(err, docs) {
    if (err) {
        return err;
    } else {
        reviewArr = docs;
    }
});

router.get('/', function (req, res) {
    var one = [
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'fawlty towers')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'teen wolf')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'friends')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'game of thrones')}
    ];
    res.locals.introData = one;
    res.render('series-game/intro');
});
router.get('/step/:step', function (req, res) {
    var one = [
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'fawlty towers')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'teen wolf')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'friends')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'game of thrones')}
    ];
    var two = [
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'doctor who')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'breaking bad')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'sons of anarchy')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the bridge')}
    ];
    var three = [
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the sopranos')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'planet earth')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the vampire diaries')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'pretty little liars')}
    ];
    var four = [
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'sherlock')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the walking dead')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'chicago fire')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'suits')}
    ];
    switch (req.params.step) {
        case '1':
            res.locals.stepNum = 1;
            res.locals.stepData = one;
            res.render('series-game/steps');
            break;
        case '2':
            res.locals.stepNum = 2;
            res.locals.stepData = two;
            res.render('series-game/steps');
            break;
        case '3':
            res.locals.stepNum = 3;
            res.locals.stepData = three;
            res.render('series-game/steps');
            break;
        case '4':
            res.locals.stepNum = 4;
            res.locals.stepData = four;
            res.render('series-game/steps');
            break;
    }
})
router.post('/step/:step', function (req, res){
    hobby = hobby.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.hobby);
    mood = mood.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.mood);
    persona = persona.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.persona);

    reviewArr = reviewArr.filter(function(el) {
        return el.review.seriesName !== req.body.one;
    });

    switch (req.params.step) {
        case '1':
            res.redirect('/seriespel/step/2');
            break;
        case '2':
            res.redirect('/seriespel/step/3');
            break;
        case '3':
            res.redirect('/seriespel/step/4');
            break;
        case '4':
            res.redirect('/seriespel/overview');
            break;
    }
})
router.get('/overview', function (req, res) {
    var hobbyResults = [], moodResults = [], personaResults = [], allResults = [];

    var hobbyUnique = hobby.filter(function( el, pos, self){
        return self.indexOf(el) == pos;
    });
    var moodUnique = mood.filter(function( el, pos, self){
        return self.indexOf(el) == pos;
    });
    var personaUnique = persona.filter(function( el, pos, self){
        return self.indexOf(el) == pos;
    });

    for (var i = 0; i < reviewArr.length; i++) {
        var hobbyArr = reviewArr[i].review.hobby;
        var moodArr = reviewArr[i].review.mood;
        var personaArr = reviewArr[i].review.persona;
        for (var j = 0; j < hobbyUnique.length; j++) {
            if (hobbyArr.includes(hobbyUnique[j])){
                hobbyResults.push(reviewArr[i]);
            }
        }
        for (var k = 0; k < moodUnique.length; k++) {
            if (moodArr.includes(moodUnique[k])){
                moodResults.push(reviewArr[i]);
            }
        }
        for (var h = 0; h < personaUnique.length; h++) {
            if (personaArr.includes(personaUnique[h])){
                personaResults.push(reviewArr[i]);
            }
        }
        var hobbyLength = hobbyResults.filter(it => it.review.seriesName === reviewArr[i].review.seriesName).length;
        var moodLength = moodResults.filter(it => it.review.seriesName === reviewArr[i].review.seriesName).length;
        var personaLength = personaResults.filter(it => it.review.seriesName === reviewArr[i].review.seriesName).length;


        var hobbyMatch = (hobbyLength / (reviewArr[i].review.hobby).length) * 100;
        var moodMatch = (moodLength / (reviewArr[i].review.mood).length) * 100;
        var personaMatch = (personaLength / (reviewArr[i].review.persona).length) * 100;

        allResults.push({
            name: reviewArr[i].review.seriesName,
            data: reviewArr[i],
            hobbyMatch: hobbyMatch,
            moodMatch: moodMatch,
            personaMatch: personaMatch,
            matchAll: Math.round((hobbyMatch + moodMatch + personaMatch) / 3)
        });
    }
    allResults.sort(function(a,b){
        if (a.matchAll > b.matchAll) {
            return -1;
        }
        else if (a.matchAll < b.matchAll) {
            return 1;
        } else {
            return 0;
        }
    })
    var bestResults = allResults.slice(0,5);
    console.log(bestResults);

    User.findOneAndUpdate( {
        'user.facebook.email' : 'shyantavleugel@gmail.com'
    }, {
        '$set' : {
            'user.profile.matches' : []
        }
    }, { upsert: false }, function(err, docs) {
        if (err) {
            return err;
        }
    });
    User.findOneAndUpdate( {
        'user.facebook.email' : 'shyantavleugel@gmail.com'
    }, {
        '$push' : {
            'user.profile.matches' : bestResults
        }
    }, { upsert: false }, function(err, docs) {
        if (err) {
            return err;
        }
    });

    res.locals.results = bestResults;
    res.locals.hobby = hobbyUnique;
    res.locals.mood = moodUnique;
    res.locals.persona = personaUnique;
    res.render('series-game/overview');
})
router.get('/details/:id', function (req, res) {
    Reviews.findOne({ 'review.seriesName': req.params.id }, function(err, series) {
        console.log('Found show: ' + series);
        res.render('series-game/detail-view', {data: series});
    });
});

module.exports = router;
