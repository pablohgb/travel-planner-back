const express = require('express')
const router = express.Router()
const City = require('../models/cities.model')


router.get('/:countryId', async (req, res) => {

    try {
        const cities = await City.find({ country: req.params.countryId })
        res.json(cities)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router