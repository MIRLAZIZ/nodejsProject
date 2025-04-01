const config = require('config')
const winston = require('winston')



module.exports = function () {
    // MySecretKey
    if (!config.get('jwtPrivateKey')) {
        winston.error('FATAL ERROR: jwtPrivateKey is not defined.');
        process.exit(1);
    }

}