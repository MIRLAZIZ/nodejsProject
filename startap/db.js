const mongoose = require("mongoose");
const winston = require('winston')
const  config = require('config')


module.exports = function () {
    // MongoDBga ulanish
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => winston.info("MongoDb ga ulanish xosil qilindi"))

}