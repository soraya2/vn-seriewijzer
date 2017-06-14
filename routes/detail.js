var express = require('express'),
    router = express.Router(),
    reviewsSchema = require('../models/reviewsschema'),
    seriesName;


router.get('/:id', function(req, res) {

    seriesName = req.params.id;
    //get serie based on serie name
    reviewsSchema.findOne({ "review.seriesName": seriesName }, function(error, doc) {

        res.render('detail', { data: doc, title: seriesName });

    });

});


module.exports = function(io) {

    io.on('connection', function(sockets) {

        sockets.broadcast.on('comment', function(comm) {
            commentsToDatabase();

            //Todo: sending facebookname to client
            // io.emit('comment', comm);
        });

    });

    return router;
};


function commentsToDatabase() {

    //Save comments to the database based on series name
    reviewsSchema.findOneAndUpdate({ "review.seriesName": seriesName }, {

        "$addToSet": {
            "comments": comm
        }
    }, { upsert: true }, function(err, document) {

        if (err) {
            return console.log(err);
        }
    });
}
