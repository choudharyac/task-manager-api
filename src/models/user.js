const mongoose = require('mongoose')
const validator = require('validator')
const becrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Task = require('../models/task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email is Invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes("password")){
                throw new Error("Password cannot contain password")
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    avatar: {
        type: Buffer
    }
    // ,
    // designation: {
    //     type: String,
    //     required: true,
    //     trim: true
    // }
},{
    timestamps: true
})

userSchema.virtual('tasks', {
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

// userSchema.methods.getPublicData = function() {
    userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error("Unable to login!")
    }
    const isMatch = await becrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Unable to login")
    }
    return user
}

//Middle ware
//Middle ware by pass update methods so have to change the code a bit
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await becrypt.hash(user.password, 8)
    }
    // console.log("Just before save")
    next()
})

//Delete tasks when user is deleted
userSchema.pre('remove', async function(next) {
    user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

//Defining a Model
const User = mongoose.model('User', userSchema)

// //Creating a instance of model
// const me = new User({
//     name: '     Andrew      ',
//     email: 'ANDREW@GMAIL.COM    ',
//     password: 'checkmate',
//     designation: '    Node JS Developer'
// })

// //Saving the model in the database
// me.save().
//     then(() => {
//         console.log(me)
//     }).
//     catch((error) => {
//         console.log("Some Error" + error)
//     })


module.exports = User