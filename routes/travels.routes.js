const express = require('express')
const router = express.Router()
const Travel = require('../models/travel.model')
const TravelCities = require('../models/travel-cities.model')
const { authenticateToken, authenticateTokenParams } = require('../middleware/authMiddleware')
const Country = require('../models/countries.model')


router.get('/travel-page/:token', authenticateTokenParams, async (req, res) => {
    try {
        const travel = await Travel.find({ user: req.info.id })
        console.log(travel)
        if (!travel) {
            return res.status(404).json({ message: "You have no travels yet" })
        }
        const travelData = [{}]
        for (i = 0; i < travel.length; i++) {
            const country = await Country.findById(travel.country)
            const citiesAndDays = await TravelCities.find({ travel: travel[i]._id })
            //            const cities = [{}]
            // for (j=0; j<citiesAndDays.length; j++) {
            //     const city =
            //     cities[j]= {
            //         city: citiesAndDays[j].city
            //     }
            // }
            travelData[i] = {
                id: travel[i]._id,
                travelName: travel[i].travelName,
                people: travel[i].people,
                country: country,
                cities: citiesAndDays
            }
        }
        // const travelData = {
        //     id: travel._id,
        //     travelName: travel.travelName,
        //     people: travel.people,
        //     country: country,
        //     citiesAndDays
        // }
        console.log(travel)
        res.status(200).json(travelData)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/create-travel', authenticateToken, async (req, res) => {
    try {
        const { travelName, people, country, token, cities } = req.body;
        const user = req.info.id
        const travel = new Travel({
            travelName,
            people,
            country,
            user,
        });

        const savedTravel = await travel.save();

        const travelCitiesPromises = cities.map(async (cityInfo) => {
            const { city, days } = cityInfo;
            const travelCity = new TravelCities({
                travel: savedTravel._id,
                city,
                days,
            });
            return await travelCity.save();
        });

        await Promise.all(travelCitiesPromises);

        res.status(201).json({ message: 'Travel and TravelCities saved successfully' });
    } catch (error) {
        console.error('Error creating travel:', error);
        res.status(500).json({ error: 'An error occurred while creating travel' });
    }
});
router.patch('/update-travel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedTravel = await Travel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedTravel) {
            return res.status(404).json({ error: 'Travel record not found' });
        }

        res.json(updatedTravel);
    } catch (error) {
        console.error('Error updating travel:', error);
        res.status(500).json({ error: 'An error occurred while updating travel' });
    }
});


router.patch('/update-travel-city/:travelId/:cityId', async (req, res) => {
    try {
        const { travelId, cityId } = req.params;
        const { days } = req.body;

        const updatedTravelCity = await TravelCities.findOneAndUpdate(
            { travel: travelId, city: cityId },
            { days },
            { new: true }
        );

        if (!updatedTravelCity) {
            return res.status(404).json({ error: 'Travel city record not found' });
        }

        res.json(updatedTravelCity);
    } catch (error) {
        console.error('Error updating travel city:', error);
        res.status(500).json({ error: 'An error occurred while updating travel city' });
    }
});

router.delete('/delete-travel/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTravel = await Travel.findByIdAndRemove(id);

        if (!deletedTravel) {
            return res.status(404).json({ error: 'Travel record not found' });
        }

        await TravelCities.deleteMany({ travel: id });

        res.json({ message: 'Travel record deleted successfully' });
    } catch (error) {
        console.error('Error deleting travel:', error);
        res.status(500).json({ error: 'An error occurred while deleting travel' });
    }
});

router.delete('/delete-travel-city/:travelId', async (req, res) => {
    try {
        const { travelId } = req.params;

        const deletedTravelCity = await TravelCities.findOneAndDelete({
            travel: travelId
        });

        if (!deletedTravelCity) {
            return res.status(404).json({ error: 'Travel city record not found' });
        }

        res.json({ message: 'Travel city record deleted successfully' });
    } catch (error) {
        console.error('Error deleting travel city:', error);
        res.status(500).json({ error: 'An error occurred while deleting travel city' });
    }
});



module.exports = router