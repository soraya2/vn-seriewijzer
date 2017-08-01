var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// Define the schema for our user model

var user = mongoose.Schema({

    user: {
        facebook: {
            id: String,
            token: String,
            secret: String,
            displayName: String,
            username: String,
            email: String,
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
            preferences: Array,
            personacheck: Array,
            matches: Array
        }
    }
});

// Methods ======================
// generating a hash
user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// Create the model for users and expose it to our app
module.exports = mongoose.model('User', user);
