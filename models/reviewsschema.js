var mongoose = require('mongoose');

var reviewsSchema = mongoose.Schema({

    user: {
        name: String,
        email: String,
        postDate: String
    },

    review: {
        seriesName: String,
        region: String,
        startYear: String,
        endYear: String,
        genre: Array,
        platform: Array,
        period: Array,
        persona: Array,
        hobby: Array,
        mood: Array,
        ageRestriction: String,
        seasons: String,
        episodes: String,
        duration: String,
        reviewTitle: String,
        reviewBody: String,
        reviewRating: String,
        reviewIntro: String,
        producers: String,
        actors: String,
        imdbRating: String,
        trailerURL: String,
        imgURL: String,
        reviewPlot: String
    },

    comments: Array
});

module.exports = mongoose.model('Review', reviewsSchema);
