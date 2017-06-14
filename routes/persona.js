var express = require('express');
var router = express.Router();
var env = require('dotenv').config();

router.get('/', function(req, res) {
    res.render('persona');
});


router.post('/', function(req, res) {
    // store form data in route

    res.locals.persona = req.body;

    if (req.user) {

        res.locals.user = req.user.user.facebook.displayName;
    }

    res.redirect(307, '/profile');

});


module.exports = router;
