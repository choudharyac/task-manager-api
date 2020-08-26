const jwt = require('jsonwebtoken')
const user = require('../models/user')
const User = require('../models/user')

const auth = async (req, res, next) => {
    // console.log("Middleware Authentication")
    // next()
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if(!user){
            throw new Error
        }
        //To access the token in router and delete properly
        req.token = token
        req.user = user
        next()
        // console.log(token)
    }catch(e){
        res.status(401).send({ error: 'Please Authenticate' })
    }
}

module.exports = auth