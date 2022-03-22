const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    roleType: {
        type: String,
        enum: ["GENERAL_USER", "ADMIN"],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    likedPosts: [{
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts'
        }
    }]
});

module.exports = User = mongoose.model('user', UserSchema);