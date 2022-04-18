const mongoose = require('mongoose');


const ServiceSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    serviceType: {
        type: String,
        enum: ["Photography", "Model", "Animation", "Painting", "Design", "Music"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: Number,
        required: true
    },
    name: {
            type: String
    },
    avatar: {
            type: String
    },
    details:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    photo_1: {
        type: String,
    },
    photo_2: {
        type:String,
    }
});

module.exports = Service = mongoose.model('service', ServiceSchema);