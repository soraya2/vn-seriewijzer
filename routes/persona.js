var express = require('express');
var router = express.Router();
var env = require('dotenv').config();

router.get('/', function(req, res) {
    res.render('persona');
});

router.post('/', function(req, res) {

    if (req.user) {
        req.session.personaform = req.body;
        req.session.user = req.user.user.facebook.displayName;
        req.session.email = req.user.user.facebook.email;
    }

    res.redirect('/persona_results');

});


module.exports = router;
