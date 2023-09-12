// db.js

// import the `MongoClient` object from the library
const { MongoClient } = require('mongodb')

// define the connection string. If you're running your DB
// on your laptop, this would most likely be it's address
const connectionUrl = 'mongodb+srv://pablohgb:Phgb2001@travelplanner.zryt4kc.mongodb.net/'

// Define the DB name. We will call ours `store`
const dbName = 'travel-planner'

// Create a singleton variable `db`
let db

// The init function retruns a promise, which, once resolved,
// assigns the mongodb connection to the `db` variable
const init = () =>
    MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
        db = client.db(dbName)
    })


// db.js

// Take the item as an argument and insert it into the "items" collection
const insertItem = (item) => {
    const collection = db.collection('users')
    return collection.insertOne(item)
}

// get all items from the "items" collection
const getItems = () => {
    const collection = db.collection('users')
    return collection.find({}).toArray()
}

// take the id and the quantity to add as arguments, and increase the
// "quantity" using the `$inc` operator
const updateQuantity = (id, quantity) => {
    const collection = db.collection('users')
    return collection.updateOne({ _id: ObjectId(id) }, { $inc: { quantity } })
}

// export the required functions so that we can use them elsewhere
module.exports = { init, insertItem, getItems, updateQuantity }
