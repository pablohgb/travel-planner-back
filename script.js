require('dotenv').config()
const mongoose = require('mongoose')


// MongoDB connection URL
const dbName = 'travel-planner';
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'))

const Country = require('./models/countries.model');
const City = require('./models/cities.model');

const data = require('./countries.json');

async function saveData() {
    for (const countryData of data.paises) {
        const country = new Country({
            name: countryData.nombre,
        });

        await country.save();
        console.log(countryData.nombre);

        for (const cityName of countryData.ciudades) {
            const city = new City({
                name: cityName,
                country: country._id,
            });

            await city.save();
            console.log(cityName);

        }
    }
}

saveData()
    .then(() => {
        console.log('Data saved successfully');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error saving data:', error);
    });
