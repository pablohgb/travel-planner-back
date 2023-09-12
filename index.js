const express = require('express')
// The `body-parser` library helps us parse the HTTP request body and provide
// it to our routes as a javascript object
const bodyParser = require('body-parser')
// The init function is imported from our `db.js` file, as well as the routes
// we created in `routes.js`
const { init } = require('./db')
const routes = require('./routes')

// Create a new express app
const app = express()
// Add the body parses middleware, as well as the HTTP routes
app.use(bodyParser.json())
app.use(routes)

// Initialize the database
init().then(() => {
    // Once the database is initialized, start the server by listening
    // on port 3000
    console.log('starting server on port 6500')
    app.listen(6500)
})
