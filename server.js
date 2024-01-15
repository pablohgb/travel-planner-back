require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose')


// MongoDB connection URL
const mongoURL = '';
const dbName = 'travel-planner';
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'))
app.use(cors());


app.use(express.json())

const userRouter = require('./routes/user.routes')
app.use('/user', userRouter)
const travelRouter = require('./routes/travels.routes')
app.use('/travel', travelRouter)
const countryRouter = require('./routes/countries.routes')
app.use('/countries', countryRouter)
const cityRouter = require('./routes/cities.routes')
app.use('/cities', cityRouter)


app.listen(6500, () => console.log("server started in port 6500"))