// Import the express library, and the functions we defined in our `db.js` file earlier
// along with the "joi" library, which we use for validation
const express = require('express')
const Joi = require('@hapi/joi')
const { insertItem, getItems, updateQuantity } = require('./db')

// Initialize a new router instance
const router = express.Router()

// Define the schema for the item
// Each item will have a `name`, which is a string
// and a `quantity`, which is a positive integer
const itemSchema = Joi.object().keys({
    username: Joi.object(),
    password: Joi.string()
})


// A new POST route is created using the `router` objects `post` method
// providing the route and handler as the arguments
router.post('/item', (req, res) => {
    // We get the item from the request body
    const item = req.body

    // The itemSchema is used to validate the fields of the item
    const result = itemSchema.validate(item)
    if (result.error) {
        // if any of the fields are wrong, log the error and return a 400 status
        console.log(result.error)
        res.status(400).end()
        return
    }

    // If the validation passes, insert the item into the DB
    insertItem(item)
        .then(() => {
            // Once the item is inserted successfully, return a 200 OK status
            res.status(200).end()
        })
        .catch((err) => {
            // If there is any error in inserting the item, log the error and
            // return a 500 server error status
            console.log(err)
            res.status(500).end()
        })
})


module.exports = router;


