var express = require('express');
var router = express.Router();
var env = require('dotenv').config();

router.get('/', function(req, res) {
    res.render('persona');
});


router.post('/', function(req, res) {
    // store form data in route
    res.locals.persona = req.body;
    res.locals.user = req.user.user.facebook.displayName;
    // res.red
    res.redirect(307, '/profile');
    // res.send(req.body);
});


module.exports = router;
