var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var reviewsSchema = require('../models/reviewsschema.js');


router.get('/', function (req, res) {
  res.render('upload_complete');
});

module.exports = router;
