var express = require('express');
var router = express.Router();
var env = require('dotenv').config();

router.get('/', function(req, res) {
    res.render('persona');
});


router.post('/', function(req, res) {


    // store form data in route

    // console.log(req.body);

    if (req.user) {
        req.session.personaform = req.body;
        req.session.user = req.user.user.facebook.displayName;
    }

    res.redirect('/profile');

});


module.exports = router;
