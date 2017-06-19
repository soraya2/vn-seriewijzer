var express = require('express');

var router = express.Router();

var env = require('dotenv').config();

var reviewsSchema = require('../models/reviewsschema');
// var serieData = [{ 'name': 'a', 'color': 'black', "tagshobby": ["gamen", "shoppen"] }, { 'name': 'b', 'color': 'blue', "tagshobby": ["reizen"] }, { 'name': 'c', 'color': 'black', "tagshobby": ["muziek", "sporten"] }];

var filters = {};
var i;
var hobbyAray = [];
var peronalityAray = [];
var moodsArray = [];

router.get('/', function(req, res) {
    reviewsSchema.find("review", function(err, docs) {
        if (err) {
            return err;
        }

        // console.log(req.session.persona.tagspersoonlijkheid);

        // console.log(req.body.persona, "personaform");

        if (req.session.personaform) {

            filterPersonality(req.session.personaform);
            // console.log(filters);
        }



        var filterdData = docs.filter(function(serie) {
            return Object.keys(filters).every(function(key) {
                console.log(filters);

                // return filters[key].some(function(filterOptions) {
                //     // console.log(serie);

                //     // return serie[key].some(function(seriesTags) {

                //     //     return filterOptions == seriesTags;
                //     // });
                // });
            });
        });

        console.log(filterdData);
        res.render('profile', { title: 'Home', data: docs, name: 'req.session.user' });

    });
});

// begin soraya
router.post('/', function(req, res) {

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
    //--------------------------------------------------------
    //fake data filter werkt niet echt!!
    // var filterdData = [];

    // Get random friends from user account
    // var arr = [];
    // var randomnumber = Math.floor(Math.random() * series2.length);
    // while (arr.length < randomnumber) {
    //     var randomnumber2 = Math.floor(Math.random() * series2.length);
    //     if (arr.indexOf(randomnumber2) > -1) {
    //         continue;
    //     }
    //     arr[arr.length] = randomnumber2;
    // }
    // for (var i = 0; i < arr.length; i++) {
    //     filterdData.push(series2[arr[i]]);
    // }


    //------------------------------------------------------

    // if (req.body.persona.tagsikwil) {

    //     filterMoods([req.body.tagsikwil]);
    // }








    //     function receiveData(data) {
    //         if (req.user !== undefined) {

    //             res.render('profile', { title: 'Home', data: data, name: req.user.user.facebook.displayName });
    //         } else {
    //             res.render('login2');
    //         }
    //     }
    // });

});


// add object array per filter
function filterPersonality(filterOption) {
    filters.persona = filterOption;


    console.log(filters.persona, "[filterpersoonlijkheid]");
    return filters.persona;
}

function filterHobby(filterOption) {
    filters.hobby = filterOption;
    console.log(filters.hobby, "[tagshobby]");
    return filters.hobby;
}

function filterMoods(filterOption) {
    filters.mood = filterOption;
    console.log(filters.mood, "[tagsikwil]");
    return filters.mood;
}

module.exports = router;
