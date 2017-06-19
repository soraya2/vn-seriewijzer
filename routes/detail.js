var express = require('express'),
    router = express.Router(),
    reviewsSchema = require('../models/reviewsschema'),
    seriesName,
    username;


router.get('/:id', function(req, res) {

    seriesName = req.params.id;
    //get serie based on serie name
    username = req.session.user;

    // console.log(username);

    reviewsSchema.findOne({ "review.seriesName": seriesName }, function(error, doc) {

        res.render('detail', { data: doc, title: seriesName });

    });

});


module.exports = function(io) {

    io.on('connection', function(sockets) {

        sockets.broadcast.on('save comment', function(comment) {

            console.log(username, "username");
            comment.username = username;
            console.log(req.session.persona);


            commentsToDatabase(comment);

            //Todo: sending facebookname to client
            io.emit('comment', comment);
        });

    });

    return router;
};


function commentsToDatabase(comment) {

    //Save comments to the database based on series name
    reviewsSchema.findOneAndUpdate({ "review.seriesName": seriesName }, {

        "$addToSet": {
            "comments": comment
        }
    }, { upsert: true }, function(err, document) {

        if (err) {
            return console.log(err);
        }
    });
}
