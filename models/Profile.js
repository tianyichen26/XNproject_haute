const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    favouriteartistsId: [{
        type: String,
    }],
    favouritesongsId: [{
        type: String,
    }],
    favouriteartists: [{
        type: String,
    }],
    favouritesongs: [{
        type: String,
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    soundtrackusername: {
        type: String
    },
    youtube: {
        type: String
    },
    twitter: {
        type: String
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Profile = mongoose.model('profile', ProfileSchema);