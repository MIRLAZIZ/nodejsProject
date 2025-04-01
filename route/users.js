const express = require('express')
const router = express.Router()
const Users = require('../moduls/users')
const validateRequest = require('../validatsiya/userValidatsiya')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

router.get('/me', auth, async (req, res) => {
  const user =  await Users.findById(req.user._id).select('-password')
  res.send(user)
})

router.post("/", async (req, res) => {
    const error = validateRequest(req, ['name', 'email', 'password']);
    if (error) {
        return res.status(400).json({ message: error })
    }


  

        let userEmail = await Users.findOne({ email: req.body.email })
        if (userEmail) {
            return res.status(400).send('mavjud b\'olgan foydalanuchi!')
        }

        const user = new Users(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']))

        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)

        await user.save()


        res.json(_.pick(user, ['_id', 'name', 'email', 'isAdmin']))
   

})

module.exports = router