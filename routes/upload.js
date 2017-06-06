var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var formidable = require('formidable');
var util = require('util');
var mongoose = require('mongoose');
var reviewsSchema = require('../models/reviewsschema.js');

mongoose.connect(process.env.MAINDB);

router.get('/', function (req, res) {
  res.render('upload');
});

// Used Formidable for form handling
// https://www.npmjs.com/package/formidable
function processUploadForm(req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log(fields);
      reviewsSchema.create({
        user: {
          name: fields.name,
          email: fields.email
        },
        review: {
          series_name: fields.series_name,
          body: fields.review,
          rating: fields.rating,
          date: fields.date
        }
      }, function (err) {
           if (err) {
            console.log('[Server] ERROR: Cannot add form information to database');
            console.log(err);
           } else {
            console.log('[Server] New review saved to database');
           }
         }
    );
  });
}

router.post('/', function (req, res) {
  console.log('New form recieved');
  processUploadForm(req, res)

  // Needs better handling for when upload has errors
  res.render('upload_complete');
});

module.exports = router;
