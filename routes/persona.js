var express = require('express');
var formidable = require('formidable');
var util = require('util');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('persona');
});

var express = require('express');

var router = express.Router();

var env = require('dotenv').config();

router.post('/', function(req, res) {
    // de waar
    res.locals.step1 = req.body;
    // res.render('index', { title: 'Home' });

});


module.exports = router;
