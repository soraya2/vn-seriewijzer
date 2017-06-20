var express = require('express'),
    router = express.Router(),
    env = require('dotenv').config(),
    reviewsSchema = require('../models/reviewsschema');
// var serieData = [{ 'name': 'a', 'color': 'black', "tagshobby": ["gamen", "shoppen"] }, { 'name': 'b', 'color': 'blue', "tagshobby": ["reizen"] }, { 'name': 'c', 'color': 'black', "tagshobby": ["muziek", "sporten"] }];

var filters = {},
    hobbyAray = [],
    peronalityAray = [],
    moodsArray = [],
    i,
    personaForm,
    key;


router.get('/', function(req, res) {
    reviewsSchema.find("review", function(err, docs) {
        if (err) {
            return err;
        }

        // console.log(req.session.persona.tagspersoonlijkheid);

        // console.log(req.body.persona, "personaform");

        // if (req.session.personaform) {

        //     filterPersonality(req.session.personaform);
        //     // console.log(filters);
        // }

        // console.log();
        function setFilter(filtername, filtervalue) {
            filters[filtername] = filtervalue;

        }


        for (key in req.session.personaform) {
            if (req.session.personaform.hasOwnProperty(key)) {
                setFilter(key, req.session.personaform[key]);
            }
        }


        // var filterdData = [];

        var filterdData = docs.filter(function(serie) {
            return Object.keys(filters).every(function(key) {

                return filters[key].some(function(filterOptions) {

                    return serie.review[key].some(function(seriesTags) {
                        console.log(filterOptions, seriesTags);

                        return filterOptions === seriesTags;
                    });

                });
            });
        });


        console.log(filterdData, "filterdata");
        res.render('profile', { title: 'Home', data: filterdData, name: 'req.session.user' });

    });
});




// add object array per filter
// function filterPersonality(filterOption) {
//     filters.persona = filterOption;


//     console.log(filters.persona, "[filterpersoonlijkheid]");
//     return filters.persona;
// }

// function filterHobby(filterOption) {
//     filters.hobby = filterOption;
//     console.log(filters.hobby, "[tagshobby]");
//     return filters.hobby;
// }

// function filterMoods(filterOption) {
//     filters.mood = filterOption;
//     console.log(filters.mood, "[tagsikwil]");
//     return filters.mood;
// }


module.exports = router;
