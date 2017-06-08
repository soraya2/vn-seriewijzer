var express = require('express');

var router = express.Router();

var request = require('request');

var env = require('dotenv').config();

var user = require('../models/user');

var series = require('../models/series');

router.get('/', function(req, res) {

    res.render('index', { title: 'Home' });

});






module.exports = router;
