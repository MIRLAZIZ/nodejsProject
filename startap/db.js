const mongoose = require("mongoose");
const winston = require('winston')
const config = require('config')


module.exports = function () {
    // MongoDBga ulanish
    mongoose
        .connect('mongodb://mongo:vXnygejYsAjoZEmBECBpHEmGmOwpksPN@mongodb.railway.internal:27017')
        .then(() => winston.info("MongoDb ga ulanish xosil qilindi"))

}