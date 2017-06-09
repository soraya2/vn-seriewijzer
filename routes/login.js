var express = require('express');


var router = express.Router();

router.get('/', function(req, res) {
    res.render('login');
});

router.post('/', handleForm, function(req, res) {
    console.log('halp');
    res.render('persona');
});

function handleForm() {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        console.log(fields);
    });
}

module.exports = router;
