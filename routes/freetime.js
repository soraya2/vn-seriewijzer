var express = require('express');
var formidable = require('formidable');
var util = require('util');

var router = express.Router();

router.get('/', function(req, res){
    res.render('freetime');
});

module.exports = router;
