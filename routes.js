// Import the express library, and the functions we defined in our `db.js` file earlier
// along with the "joi" library, which we use for validation
const express = require('express')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { insertItem, getItems, updateQuantity, login } = require('./db')

// Initialize a new router instance
const router = express.Router()

// Define the schema for the item
// Each item will have a `name`, which is a string
// and a `quantity`, which is a positive integer
const itemSchema = Joi.object().keys({
    username: Joi.string(),
    password: Joi.string()
})


// A new POST route is created using the `router` objects `post` method
// providing the route and handler as the arguments
router.post('/users', (req, res) => {
    // We get the item from the request body
    const item = req.body
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const userInfo = { username: req.body.username, password: hash }
        if (result.error) {
            // if any of the fields are wrong, log the error and return a 400 status
            console.log(result.error)
            res.status(400).end()
            return
        }

        // If the validation passes, insert the item into the DB
        insertItem(userInfo)
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
        // Now we can store the password hash in db.
    });
    // The itemSchema is used to validate the fields of the item
    const result = itemSchema.validate(item)

})

router.get('/login', async (req, res) => {

    const username = req.body.username;
    const user = login(username);
    console.log(req.body)
    console.log(user)

    bcrypt.compare(req.body.password, user.password, function (err, res) {
        if (res == true) {
            res.status(200).send(user)
            return user;
        } else {
            console.log('incorrect password')
            console.log(err)
            res.status(500).end()
        }

        // if res == true, password matched
        // else wrong password
    });

})


module.exports = router;


