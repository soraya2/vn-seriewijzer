var express = require('express');
var router = express.Router();
var env = require('dotenv').config();

router.get('/', function(req, res) {
    res.render('persona');
});


router.post('/', function(req, res) {
    // store form data in route
    res.locals.step1 = req.body;
    res.send('hello');

});


module.exports = router;
