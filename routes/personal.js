var express = require('express');

var router = express.Router();

var env = require('dotenv').config();

router.post('/', function(req, res) {
    // de waar
    res.locals.step1 = req.body;
    // res.render('index', { title: 'Home' });

});

// router.post('/step2', function(req, res) {
            //     res.locals.step2 = req.body;
            //     // res.render('index', { title: 'Home' });

            // });


            // router.post('/step3', function(req, res) {
            //     res.locals.step2 = req.body;
            //     // res.render('index', { title: 'Home' });

            // });


module.exports = router;
