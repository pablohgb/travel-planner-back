const Country = require('../models/countries.model')


const getCountries = async (req, res) => {
    try {
        const countries = await Country.find()
        res.json(countries)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = getCountries