const errorMiddleware = require('../middleware/error')
const books = require("../route/books");
const users = require('../route/users')
const auth = require('../route/auth')
const express = require("express");



module.exports = function (app) {
    app.use(express.json());
    app.use('/books', books)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use(errorMiddleware)

}