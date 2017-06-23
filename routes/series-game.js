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
  res.render('series-game/intro');
});
router.get('/1', function (req, res) {
    var step1 = [
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'fawlty towers')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'teen wolf')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'friends')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'game of thrones')}
    ]
    res.locals.stepNum = 1;
    res.locals.stepData = step1;
    res.render('series-game/steps');
});
router.post('/1', function(req, res){
    hobby = reviewArr.find(o => o.review.seriesName === req.body.one).review.hobby;
    mood = reviewArr.find(o => o.review.seriesName === req.body.one).review.mood;
    persona = reviewArr.find(o => o.review.seriesName === req.body.one).review.persona;

    reviewArr = reviewArr.filter(function(el) {
        return el.review.seriesName !== req.body.one;
    });
    console.log(hobby);
    res.redirect('2');
});
router.get('/2', function (req, res) {
    var step2 = [
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'doctor who')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'breaking bad')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'sons of anarchy')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the bridge')}
    ]
    res.locals.stepNum = 2;
    res.locals.stepData = step2;
    res.render('series-game/steps');
});
router.post('/2', function(req, res){
    hobby = hobby.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.hobby);
    mood = mood.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.mood);
    persona = persona.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.persona);

    reviewArr = reviewArr.filter(function(el) {
        return el.review.seriesName !== req.body.one;
    });
    console.log(req.body.one);
    console.log(hobby);
    res.redirect('3');
});
router.get('/3', function (req, res) {
    var step3 = [
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the sopranos')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'planet earth')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the vampire diaries')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'pretty little liars')}
    ]
    res.locals.stepNum = 3;
    res.locals.stepData = step3;
    res.render('series-game/steps');
});
router.post('/3', function(req, res){
    hobby = hobby.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.hobby);
    mood = mood.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.mood);
    persona = persona.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.persona);

    reviewArr = reviewArr.filter(function(el) {
        return el.review.seriesName !== req.body.one;
    });
    console.log(req.body.one);
    console.log(hobby);
    res.redirect('4');
});
router.get('/4', function (req, res) {
    var step4 = [
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'sherlock')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the walking dead')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'chicago fire')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'suits')}
    ]
    res.locals.stepNum = 4;
    res.locals.stepData = step4;
    res.render('series-game/steps');
});
router.post('/4', function(req, res){
    hobby = hobby.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.hobby);
    mood = mood.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.mood);
    persona = persona.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.persona);

    reviewArr = reviewArr.filter(function(el) {
        return el.review.seriesName !== req.body.one;
    });
    console.log(req.body.one);
    console.log(hobby);
    res.redirect('overview');
});
router.get('/overview', function (req, res) {
    var resultsHobby = [];
    var resultsMood = [];
    var resultsPersona = [];
    var resultsAll = [];
    var resultsBest = [];


    // place in function
    var hobbyUnique = hobby.filter(function( el, pos, self){
        return self.indexOf(el) == pos;
    });
    var moodUnique = mood.filter(function( el, pos, self){
        return self.indexOf(el) == pos;
    });
    var personaUnique = persona.filter(function( el, pos, self){
        return self.indexOf(el) == pos;
    });

    // Make code dry
    // Start function

    for (var i = 0; i < reviewArr.length; i++) {
        var hobbyArr = reviewArr[i].review.hobby;
        var moodArr = reviewArr[i].review.mood;
        var personaArr = reviewArr[i].review.persona;
        for (var j = 0; j < hobbyUnique.length; j++) {
            if (hobbyArr.includes(hobbyUnique[j])){
                resultsHobby.push(reviewArr[i]);
            }
        }
        for (var k = 0; k < moodUnique.length; k++) {
            if (moodArr.includes(moodUnique[k])){
                resultsMood.push(reviewArr[i]);
            }
        }
        for (var h = 0; h < personaUnique.length; h++) {
            if (personaArr.includes(personaUnique[h])){
                resultsPersona.push(reviewArr[i]);
            }
        }
        var hobbyLength = resultsHobby.filter(it => it.review.seriesName === reviewArr[i].review.seriesName).length;
        var moodLength = resultsMood.filter(it => it.review.seriesName === reviewArr[i].review.seriesName).length;
        var personaLength = resultsPersona.filter(it => it.review.seriesName === reviewArr[i].review.seriesName).length;


        var hobbyMatch = (hobbyLength / (reviewArr[i].review.hobby).length) * 100;
        var moodMatch = (moodLength / (reviewArr[i].review.mood).length) * 100;
        var personaMatch = (personaLength / (reviewArr[i].review.persona).length) * 100;

        resultsAll.push({
            name: reviewArr[i].review.seriesName,
            data: reviewArr[i],
            hobbyMatch: hobbyMatch,
            moodMatch: moodMatch,
            personaMatch: personaMatch,
            matchAll: Math.round((hobbyMatch + moodMatch + personaMatch) / 3)
        });
        if (resultsAll[i].matchAll > 50){
            resultsBest.push(resultsAll[i]);
        }
    }

    // end function
    resultsBest.sort(function(a,b){
        if (a.matchAll > b.matchAll) {
            return -1;
        }
        else if (a.matchAll < b.matchAll) {
            return 1;
        } else {
            return 0;
        }
    })
    resultsBest = resultsBest.slice(0,5);
    console.log(resultsBest);

    User.findOneAndUpdate( {
        'user.facebook.username' : req.session.username
    }, {
        '$push' : {
            'user.profile.matches' : resultsBest
        }
    }, { upsert: true }, function(err, document) {
        if (err) {
            return err;
        }
    });

    res.locals.results = resultsBest;
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
