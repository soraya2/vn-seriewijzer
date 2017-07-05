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

router.get('/', function(req, res) {
    var one = [
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'fawlty towers') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'teen wolf') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'friends') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'game of thrones') }
    ];
    res.locals.introData = one;
    res.render('series-game/intro');
});
router.get('/step/:step', function(req, res) {
    // Save the tvshows by filtering them from the database
    var one = [
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'fawlty towers') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'teen wolf') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'friends') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'game of thrones') }
    ];
    var two = [
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'doctor who') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'breaking bad') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'sons of anarchy') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the bridge') }
    ];
    var three = [
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the sopranos') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'planet earth') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the vampire diaries') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'pretty little liars') }
    ];
    var four = [
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'sherlock') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'the walking dead') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'chicago fire') },
        { data: reviewArr.find(o => o.review.seriesName.toLowerCase() === 'suits') }
    ];
    // Tell the route which data to send to the view, based on what page you are
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
router.post('/step/:step', function(req, res) {
    // Fetch all the tags from the objects that are ranked first
    hobby = hobby.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.hobby);
    mood = mood.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.mood);
    persona = persona.concat(reviewArr.find(o => o.review.seriesName === req.body.one).review.persona);

    // Remove the item that is ranked first from the array, so these won't be in the results
    reviewArr = reviewArr.filter(function(el) {
        return el.review.seriesName !== req.body.one;
    });

    // Tell the route which redirect to use, based on what page you are
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
router.get('/overview', function(req, res) {
    // Set the empty arrays to fill them later on
    var hobbyResults = [],
        moodResults = [],
        personaResults = [],
        allResults = [];

    // Remove all the duplicates from the array
    var hobbyUnique = hobby.filter(function(el, pos, self) {
        return self.indexOf(el) == pos;
    });
    var moodUnique = mood.filter(function(el, pos, self) {
        return self.indexOf(el) == pos;
    });
    var personaUnique = persona.filter(function(el, pos, self) {
        return self.indexOf(el) == pos;
    });

    // loop through every item
    for (var i = 0; i < reviewArr.length; i++) {
        // save the tags in variables
        var hobbyArr = reviewArr[i].review.hobby;
        var moodArr = reviewArr[i].review.mood;
        var personaArr = reviewArr[i].review.persona;
        // Check for each label, how many tags are similar, so are a match
        for (var j = 0; j < hobbyUnique.length; j++) {
            if (hobbyArr.includes(hobbyUnique[j])) {
                // Every time a tv show includes a tag, push it in an array
                hobbyResults.push(reviewArr[i]);
            }
        }
        for (var k = 0; k < moodUnique.length; k++) {
            if (moodArr.includes(moodUnique[k])) {
                // Every time a tv show includes a tag, push it in an array
                moodResults.push(reviewArr[i]);
            }
        }
        for (var h = 0; h < personaUnique.length; h++) {
            if (personaArr.includes(personaUnique[h])) {
                // Every time a tv show includes a tag, push it in an array
                personaResults.push(reviewArr[i]);
            }
        }
        // Count the duplicate series to see how many tags are similar
        var hobbyLength = hobbyResults.filter(it => it.review.seriesName === reviewArr[i].review.seriesName).length;
        var moodLength = moodResults.filter(it => it.review.seriesName === reviewArr[i].review.seriesName).length;
        var personaLength = personaResults.filter(it => it.review.seriesName === reviewArr[i].review.seriesName).length;

        // Check how many tags are similar, devide by the number of tags a tv show has,
        // multiply by 100 to get a percentage
        var hobbyMatch = (hobbyLength / (reviewArr[i].review.hobby).length) * 100;
        var moodMatch = (moodLength / (reviewArr[i].review.mood).length) * 100;
        var personaMatch = (personaLength / (reviewArr[i].review.persona).length) * 100;

        // push the tvshows in a new array and add the percentages to it.
        allResults.push({
            name: reviewArr[i].review.seriesName,
            data: reviewArr[i],
            hobbyMatch: hobbyMatch,
            moodMatch: moodMatch,
            personaMatch: personaMatch,
            matchAll: Math.round((hobbyMatch + moodMatch + personaMatch) / 3)
        });
    }
    // Sort the array from highest to lowest percentage
    allResults.sort(function(a, b) {
            if (a.matchAll > b.matchAll) {
                return -1;
            } else if (a.matchAll < b.matchAll) {
                return 1;
            } else {
                return 0;
            }
        })
        // Push the best 5 results in a new array
    var bestResults = allResults.slice(0, 5);
    console.log(bestResults);

    // Clear the matches array in the database at the logged in user
    User.findOneAndUpdate({
        'user.facebook.email': req.session.email
    }, {
        '$set': {
            'user.profile.matches': []
        }
    }, { upsert: false }, function(err, docs) {
        if (err) {
            return err;
        }
    });
    // Push the best results in the matches array in the database at the logged in user
    User.findOneAndUpdate({
        'user.facebook.email': req.session.email
    }, {
        '$push': {
            'user.profile.matches': bestResults
        }
    }, { upsert: false }, function(err, docs) {
        if (err) {
            return err;
        }
    });

    // set the data in res.locals to render in the view
    res.locals.results = bestResults;
    res.render('series-game/overview');
})
router.get('/details/:id', function(req, res) {
    Reviews.findOne({ 'review.seriesName': req.params.id }, function(err, series) {
        console.log('Found show: ' + series);
        res.render('series-game/detail-view', { data: series });
    });
});

module.exports = router;
