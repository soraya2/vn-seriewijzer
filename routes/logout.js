var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {

    req.session.user = undefined;
    req.session.email = undefined;

    req.logout();
    res.redirect('/');
});


module.exports = router;
