const mongoose = require('mongoose');
const User = require('./user.model');
const Country = require('./countries.model');

const travelSchema = new mongoose.Schema({
    travelName: {
        type: String,
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

},
    {
        timestamps: true
    }
);

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;
