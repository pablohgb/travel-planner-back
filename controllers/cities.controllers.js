const City = require('../models/cities.model')

const getCountry = async (req, res) => {
    try {
        const cities = await City.find({ country: req.params.id })
        res.json(cities)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = getCountry
