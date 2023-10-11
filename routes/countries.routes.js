const express = require('express')
const router = express.Router()
const Country = require('../models/countries.model')


router.get('/', async (req, res) => {
    try {
        const countries = await Country.find()
        res.json(countries)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router