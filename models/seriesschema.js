var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// Define the schema for our user model

var seriesSchema = mongoose.Schema({

    user: {
        facebook: {
            id: String,
            token: String,
            secret: String,
            displayName: String,
            username: String,
            friends: Array
        },

        google: {
            id: String,
            token: String,
            secret: String,
            displayName: String,
            username: String,
            calender: Array
        },

        profile: {
            messages: Array,
            preferences: Array
        }
    },

    admin: {
        name: String,
        reviews: Array

    },

    series: {
        data: Array
    }


});

// Methods ======================
// generating a hash
seriesSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
seriesSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// Create the model for users and expose it to our app
module.exports = mongoose.model('User', seriesSchema);
