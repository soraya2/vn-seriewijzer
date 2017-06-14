var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Reviews = require('../models/reviewsschema');
var reviewArr;

Reviews.find("review", function(err, docs) {
    if (err) {
        return err;
    } else{
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
    res.locals.stepNext = 2;
    res.render('series-game/steps');
})
router.get('/2', function (req, res) {
    var step2 = [
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'doctor who')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'breaking bad')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'sons of anarchy')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the bridge')}
    ]
    res.locals.stepNum = 2;
    res.locals.stepData = step2;
    res.locals.stepNext = 3;
    res.render('series-game/steps');
})
router.get('/3', function (req, res) {
    var step3 = [
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'sopranos')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'planet earth')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the vampire diaries')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'pretty little liars')}
    ]
    res.locals.stepNum = 3;
    res.locals.stepData = step3;
    res.locals.stepNext = 4;
    res.render('series-game/steps');
})
router.get('/4', function (req, res) {
    var step4 = [
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'sherlock')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the walking dead')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'chicago fire')},
        {   data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'suits')}
    ]
    res.locals.stepNum = 4;
    res.locals.stepData = step4;
    res.locals.stepNext = 'overview';
    res.render('series-game/steps');
})

router.get('/details/:id', function (req, res) {
    Reviews.findOne({ 'review.seriesName': req.params.id }, function(err, series) {
        console.log('Found show: ' + series);
        res.render('series-game/detail-view', { data: series });
    });


});
module.exports = router;
