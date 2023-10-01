const mongoose = require('mongoose');
const City = require('./cities.model');
const Travel = require('./travel.model');

const travelCitiesSchema = new mongoose.Schema({
    travel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Travel',
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    days: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    }
);

const TravelCities = mongoose.model('TravelCities', travelCitiesSchema);

module.exports = TravelCities;
