var mongoose = require('mongoose');

var reviewsSchema = mongoose.Schema({

  user: {
    name: String,
    email: String
  },

  review: {
    series_name: String,
    body: String,
    rating: Number,
    date: String
    // seriesImg: hier de link naar de afbeelding van de serie die de gebruiker uploaden kan
  }
});

module.exports = mongoose.model('Review', reviewsSchema);
