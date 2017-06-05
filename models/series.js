var mongoose = require('mongoose');
// Define the schema for our user model

var series = mongoose.Schema({

    series: {
        data: Array
    }


});



// Create the model for users and expose it to our app
module.exports = mongoose.model('Series', seriesSchema);
