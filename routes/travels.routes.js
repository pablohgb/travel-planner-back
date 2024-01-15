const Router = require("express");
const travelRouter = Router();
const { getTravels, createTravel, updateTravel, updateTravelCity, deleteTravel, deleteTravelCity } = require("../controllers/travel.controllers");
const { authenticateTokenParams, authenticateToken } = require("../middleware/authMiddleware");

travelRouter
    .get('/travel-page/:token', authenticateTokenParams, getTravels)
    .post('/create-travel', authenticateToken, createTravel)
    .patch('/updateTravel/:id', updateTravel)
    .patch('/update-travel-city/:travelId/:cityId', updateTravelCity)
    .delete('/delete-travel', deleteTravel)
    .delete('/delete-travel-city', deleteTravelCity)

module.exports = travelRouter;
