const express = require('express')
const router = express.Router()
const Users = require('../moduls/users')
const validateRequest = require('../validatsiya/userValidatsiya')
const bcrypt = require('bcrypt')




router.post("/", async (req, res) => {
    const error = validateRequest(req, ['email', 'password']);
    if (error) {
        return res.status(400).json({ message: error })
    }


    try {

        let user = await Users.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).send("Email yoki password noto'g'ri")
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        if (!isValidPassword) {
            return res.status(400).send("Email yoki password noto'g'ri")
        }
        // 'maxfiybolishikerak128'
        const token = user.generetToken()
        res.header('x-auth-token', token).send(true)




    }

    catch (err) {
        res.status(500).send('Server error')
    }

})

module.exports = router