const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// //Defining a Model
// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if(!validator.isEmail(value)){
//                 throw new Error("Email is Invalid")
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if(value.toLowerCase().includes("password")){
//                 throw new Error("Password cannot contain password")
//             }
//         }
//     },
//     designation: {
//         type: String,
//         required: true,
//         trim: true
//     }
// })

// // //Creating a instance of model
// // const me = new User({
// //     name: '     Andrew      ',
// //     email: 'ANDREW@GMAIL.COM    ',
// //     password: 'checkmate',
// //     designation: '    Node JS Developer'
// // })

// // //Saving the model in the database
// // me.save().
// //     then(() => {
// //         console.log(me)
// //     }).
// //     catch((error) => {
// //         console.log("Some Error" + error)
// //     })

// const Task = mongoose.model('Task', {
//     course: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const myTask = new Task({
//     course: '           The Bootcamp for Python'
//     // completed: true
// })

// myTask.save().
//     then(() => {
//         console.log(myTask)
//     }).
//     catch((error) => {
//         console.log("Error occured", error)
//     })