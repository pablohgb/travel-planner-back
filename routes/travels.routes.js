const express = require('express')
const router = express.Router()
const Travel = require('../models/travel.model')
const TravelCities = require('../models/travel-cities.model')

// //getAll
// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find()
//         res.json(users)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })
// //GetOne
// router.get('/', getUser, (req, res) => {
//     res.send(res.user.username)
// })
//CreateOne
router.post('/create-travel', async (req, res) => {
    try {
        const { travelName, people, country, user, cities } = req.body;

        // Create a new Travel document
        const travel = new Travel({
            travelName,
            people,
            country,
            user,
        });

        // Save the travel document
        const savedTravel = await travel.save();

        // Create and save TravelCities documents for each city
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
// Endpoint for updating a travel record
app.patch('/update-travel/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the travel record's ObjectID from the URL
        const updatedData = req.body; // Data to update the travel record

        // Use Mongoose to find and update the travel record
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


// Endpoint for updating the number of days in a city for a selected travel
app.patch('/update-travel-city/:travelId/:cityId', async (req, res) => {
    try {
        const { travelId, cityId } = req.params; // Extract the travel and city ObjectIDs from the URL
        const { days } = req.body; // Updated number of days

        // Use Mongoose to find and update the TravelCities document
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

// Endpoint for deleting a travel record
app.delete('/delete-travel/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the travel record's ObjectID from the URL

        // Use Mongoose to find and delete the travel record
        const deletedTravel = await Travel.findByIdAndRemove(id);

        if (!deletedTravel) {
            return res.status(404).json({ error: 'Travel record not found' });
        }

        // Also, delete associated TravelCities records (assuming you have this reference set up)
        await TravelCities.deleteMany({ travel: id });

        res.json({ message: 'Travel record deleted successfully' });
    } catch (error) {
        console.error('Error deleting travel:', error);
        res.status(500).json({ error: 'An error occurred while deleting travel' });
    }
});

// Endpoint for deleting a TravelCities document for a specific travel and city
app.delete('/delete-travel-city/:travelId/:cityId', async (req, res) => {
    try {
        const { travelId, cityId } = req.params; // Extract the travel and city ObjectIDs from the URL

        // Use Mongoose to find and delete the TravelCities document
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