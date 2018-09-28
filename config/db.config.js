const mongoose = require('mongoose');
const DB_URL = process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/urlshortener"

mongoose.connect(DB_URL, { useMongoClient: true })
.then(() => {
    console.info(`Success connecting to: ${DB_URL}`)
})
.catch(error => {
    console.error('There was a problem with the db connection', error)
});