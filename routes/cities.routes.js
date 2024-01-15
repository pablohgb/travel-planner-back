const Router = require("express");
const cityRouter = Router();
const getCountry = require("../controllers/cities.controllers");



cityRouter
    .get('/:id', getCountry)

module.exports = cityRouter;