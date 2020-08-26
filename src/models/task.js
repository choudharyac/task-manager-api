const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    course: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
        //Reference with another model, the 'User' is name of model in the user model
    }
},{
    timestamps: true
})

taskSchema.pre("save", async function(next) {
    const task = this
    console.log("Task Created")
    next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task