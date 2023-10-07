const express = require('express')
const router = express.Router()
const Travel = require('../models/travel.model')
const TravelCities = require('../models/travel-cities.model')

router.post('/create-travel', async (req, res) => {
    try {
        const { travelName, people, country, user, cities } = req.body;

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

router.delete('/delete-travel-city/:travelId/:cityId', async (req, res) => {
    try {
        const { travelId, cityId } = req.params;

        const deletedTravelCity = await TravelCities.findOneAndDelete({
            travel: travelId,
            city: cityId
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