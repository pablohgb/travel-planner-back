const mongoose = require('mongoose');
const Country = require('./countries.model');

const citySchema = new mongoose.Schema({
    name: {
        type: String
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    }
});

const City = mongoose.model('City', citySchema);

module.exports = City;
