// const {Users} = require('../../../moduls/users   ')
const Users = require('../../../moduls/users')
const jwt = require('jsonwebtoken')
const config = require('config')


describe('users', () => {
    it('generetToken test', () => {

    let user = new Users({isAdmin:true})
    const token = user.generetToken()
    const decoded = jwt.verify(token, config.get('jwtPrivateKey') )
    expect(decoded).toMatchObject({isAdmin:true})
    })
})  