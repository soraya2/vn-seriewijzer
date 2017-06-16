var mongoose = require('mongoose');
// Define the schema for our user model

var seriesSchema = mongoose.Schema({

    series: Array

});


// Create the model for series and expose it to our app
module.exports = mongoose.model('Series', seriesSchema);
