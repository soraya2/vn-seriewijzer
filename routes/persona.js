//BEGIN SORAYA
var express = require('express');
var router = express.Router();
var env = require('dotenv').config();

router.get('/', function(req, res) {
    res.render('persona', {
        message: 'undefined'
    });
});

router.post('/', function(req, res) {
    req.session.personaform = req.body;
    if (req.user) {
        req.session.user = req.user.user.facebook.displayName;
        req.session.email = req.user.user.facebook.email;
    }

    validate(req.body, res);
});

//BEGIN CHANEL
function validate(obj, res) {
    var data = {};

    //If the user only picked one characteristic, the object will not contain an array but a string. This function converts every property to a string
    function Arrify(input) {
        for (var prop in input) {
            console.log(typeof input[prop]);
            if (typeof input[prop] == 'string') {
                data[prop] = [input[prop]];
            } else {
                data[prop] = input[prop];
            }
        }
    }

    Arrify(obj);

    //Check if object is empty
    function checkIfObjectEmpty(ob) {
        for (var key in ob) {
            if (ob.hasOwnProperty(key)) {
                return false;
            }
            return true;
        }
    }

    //Check if user has nothing filled out
    if (checkIfObjectEmpty(data) == undefined) {
        res.render('persona', {
            message: 'Je hebt niks ingevuld! Vul even alles in!'
        });
        //Check if one of the steps isn't filled out
    } else if (!data.persona || !data.hobby || !data.mood) {
        res.render('persona', {
            message: 'Een van de onderdelen heb je niet ingevuld!'
        });
        // } else if (){
        //Check if one of the steps has more than one checked checkboxes.
    } else if (data.persona.length > 3 || data.hobby.length > 3 || data.mood.length > 3) {
        res.render('persona', {
            message: 'Op een van de onderdelen heb je meer dan 3 eigenschappen aangeklikt. Je mag er maar drie!'
        });
        //If it doesn't match any of the above conditions then the form was filled out correctly
    } else {
        res.redirect(307, '/persona_results');
    }
}
//END CHANEL

module.exports = router;
//END SORAYA
