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
        platform: String,
        period: Array,
        persona: Array,
        hobby: Array,
        mood: Array,
        ageRestriction: String,
        seasons: String,
        episodes: String,
        duration: String,
        producers: String,
        awards: String,
        nominations: String,
        imdbRating: String,
        trailerURL: String,
        imgURL: String,
        plot: String,
        reviewBody: String,
        rating: String
    },

    comments: Array
});

module.exports = mongoose.model('Review', reviewsSchema);
