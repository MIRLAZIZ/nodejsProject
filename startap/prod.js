const compression = require('compression')
// const hamlet = require('hamlet')


module.exports = function(app) {
    // app.use(hamlet())
    app.use(compression())
}