var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('user', new Schema({
    id: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    pictureUrl: {
        type: String
    },
    publicProfileUrl: {
        type: String
    },
    emailAddress: {
        type: String
    },
    location: {
        type: String
    },
    loginDate: {
        type: String
    },
    isLoggedIn: {
        type: Boolean
    }
}));