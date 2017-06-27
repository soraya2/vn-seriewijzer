var express = require('express'),
    router = express.Router(),
    env = require('dotenv').config(),
    reviewsSchema = require('../models/reviewsschema'),
    user = require('../models/user'),
    filters = {},
    i,
    personaForm,
    key;

router.get('/', function(req, res) {

    reviewsSchema.find("review", function(err, docs) {
        if (err) {
            return err;
        }

        for (key in req.session.personaform) {
            if (req.session.personaform.hasOwnProperty(key)) {

                arrayCheck(key, req.session.personaform[key]);
            }
        }

        var filterdData = docs.filter(function(serie) {

            return Object.keys(filters).every(function(key) { // For each key in filter return filter key value

                return filters[key].some(function(filterOptions) { // Compare filter options with serie tags

                    return serie.review[key].some(function(seriesTags) {

                        console.log(filterOptions === seriesTags);

                        return filterOptions === seriesTags;
                    });

                });
            });
        });
        resultsToDatabase(filterdData);
        res.render('persona_results', { title: 'Home', data: filterdData, name: req.session.user });

    });
});

function setFilter(filterName, filterValue) {

    filters[filterName] = filterValue;
}

function arrayCheck(filterName, filterValue) {

    if (Array.isArray(filterValue) === false) {

        setFilter(filterName, new Array(filterValue));
    } else {

        setFilter(filterName, filterValue);
    }
}

function filterLenghtCheck(filterData) {

    if (filterdData.length >= 0) {

        return filterdData;
    } else {
        var message = "no results";

        return message;
    }
}



function resultsToDatabase(filterData) {

    user.findOneAndUpdate({ 'user.facebook.email': 'soraya.02.11@hotmail.com' }, {

        '$addToSet': {
            'user.profile.personacheck': {
                $each: filterData
            }
        }
    }, { upsert: true }, function(err, document) {

        if (err) {
            return console.log(err);
        }
    });
}
module.exports = router;
