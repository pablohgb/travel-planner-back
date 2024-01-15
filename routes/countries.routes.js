const Router = require("express");
const countryRouter = Router();
const getCountries = require('../controllers/countries.controllers')

countryRouter
    .get('/', getCountries)

module.exports = countryRouter