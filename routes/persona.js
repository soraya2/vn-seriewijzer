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
    if (req.user) {
        req.session.personaform = req.body;
        req.session.user = req.user.user.facebook.displayName;
    }

    validate(req.body, res);
});

//BEGIN CHANEL
function validate(obj, res){
    //Check if object is empty
    function checkIfEmpty(ob){
        for (var key in ob){
            if(ob.hasOwnProperty(key)){
                return false;
            } else {

            }
            return true;
        }
    }
    //Check if user has nothing filled out
    if(checkIfEmpty(obj) == undefined){
        res.render('persona', {
            message: 'Je hebt niks ingevuld! Vul even alles in!'
        });
    //Check if one of the steps isn't filled out
    } else if (!obj.persona || !obj.hobby || !obj.mood){
        res.render('persona', {
            message: 'Een van de onderdelen heb je niet ingevuld!'
        });
    //Check if one of the steps has more than one checked checkboxes.
    } else if (obj.persona.length > 3 || obj.hobby.length > 3 || obj.mood.length > 3){
        res.render('persona', {
            message: 'Op een van de onderdelen heb je meer dan 3 eigenschappen aangeklikt. Je mag er maar drie!'
        });
    //If it doesn't match any of the above conditions then the form was filled out correctly
    } else {
        res.redirect('/profile');
    }
}
//END CHANEL

module.exports = router;
//END SORAYA
