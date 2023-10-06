require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')


// MongoDB connection URL
const mongoURL = ''; // Replace with your MongoDB URL
const dbName = 'travel-planner'; // Replace with your database name
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const userRouter = require('./routes/user.routes')
app.use('/user', userRouter)
const travelRouter = require('./routes/travels.routes')
app.use('/travel', travelRouter)


app.listen(6500, () => console.log("server started in port 6500"))