const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

// users uchun schema 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
        // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    isAdmin: {
        type:Boolean,
        required:true
    }

}, { timestamps: true })
userSchema.methods.generetToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'))
    return token

}

const Users = mongoose.model('Users', userSchema)
module.exports = Users



