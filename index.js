const express = require("express");
const app = express()
const winston = require('winston')
require('./startap/loggin')()
require('./startap/routes')(app)
require('./startap/db')()
require('./startap/config')()
require('./startap/prod')(app)

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  winston.info(`Example app listening on port ${port}`);
});

module.exports = server