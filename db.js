const { MongoClient } = require('mongodb');

const connectionUrl = 'mongodb+srv://pablohgb:Phgb2001@travelplanner.zryt4kc.mongodb.net/';
const dbName = 'travel-planner';

let db;

const init = () =>
    MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
        db = client.db(dbName);
    });

module.exports = { init, db };
