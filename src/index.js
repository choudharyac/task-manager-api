const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// const User = require('./models/user')
// const Task = require('./models/task')
// const { update } = require('./models/user')

const app = express()

const port = process.env.PORT

// app.use((req, res, next) => {
//     // console.log(req.method, req.path)
//     // next()
//     //Without calling next the middleware wont run
//     if(req.method === 'GET'){
//         res.send("GET requests are disabled!")
//     }else{
//         next()
//     }
// })

// app.use((req, res, next) => {
//     if(req.method){
//         res.status(503).send("The site is under maintainence, plz try again later")
//     }
// })

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

//
//Without Middleware: new request -> run route handler
//
//With Middleware: : new request -> do something -> run route handler
//



// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'Red12345!'
//     const hashPass = await bcrypt.hash(password, 8)
//     console.log(password)
//     console.log(hashPass)

//     const isMatch = await bcrypt.compare('Red12345!', hashPass)
//     console.log(isMatch)
// } 

// myFunction()


// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign('_id: abcde', "This is a token", { expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'This is a token')
//     console.log(data)
// } 

// myFunction()

// app.post('/users', (req, res) => {
//     // console.log(req.body)
//     // res.send("User testing")
//     const user = new User(req.body)
//     user.save().
//         then(() => {
//             res.send(user)
//         }).
//         catch((e) => {
//             res.status(400).send(e)
//         })        
// })

// app.post('/users', async (req, res) => {
//     const user = new User(req.body)
//     try{
//         await user.save()
//         res.status(201).send(user)
//     }catch(e){
//         res.status(400).send(e)
//     }
  
// })

// // app.get('/users', (req, res) => {
// //     User.find({}).
// //         then((users) => {
// //             res.send(users)
// //         }).
// //         catch((err) => {

// //         })
// // })

// app.get('/users', async (req, res) => {

//     try{
//         const user = await User.find({})
//         res.status(201).send(user)
//     }catch(e) {
//         console.log(e)
//     }
// })



// // app.get('/users/:id', (req, res) => {
// //     console.log(req.params)
// //     const _id = req.params.id
// //     User.findById(_id).
// //         then((user) => {
// //             if(!user){
// //                 return res.status(404).send()
// //             }
// //             res.send(user)
// //         }).
// //         catch((err) => {
// //             res.status(500).send()
// //         })
// // })

// app.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try{
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.status(201).send(user)
//     }catch(e){
//         console.log(e)
//     }
// })

// // app.post('/tasks', (req, res) => {
// //     const task = new Task(req.body)
// //     task.save().
// //         then(() => {
// //             res.send(task)
// //         }).catch((err) => {
// //             res.status(400).send(err)
// //         })
// // })

// app.post('/tasks', async (req, res) => {
//     const task = new Task(req.body)

//     try{
//         await task.save()
//         res.status(201).send(task)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })

// app.get('/tasks', (req, res) => {
//     Task.find({}).
//         then((task) => {
//             res.send(task)
//         }).
//         catch((err) => {
//             res.status(500).send()
//         })
// })

// app.post('/tasks', async (req, res) => {
//     const task = new Task(req.body)

//     try{
//         await task.save()
//         res.status(201).send(task)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })

// app.get('/tasks', async (req, res) => {

//     try{
//         const task = await Task.find({})
//         res.status(201).send(task)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

// app.get('/tasks/:id', (req, res) => {
//     console.log(req.params)
//     const _id = req.params.id
//     Task.findById(_id).
//         then((task) => {
//             if(!task){
//                 return res.status(404).send()
//             }
//             res.send(task)
//         }).
//         catch((err) => {
//             res.status(500).send()
//         })
// })

// app.get('/tasks/:id', async (req, res) => {
//     console.log(req.params)
//     const _id = req.params.id

//     try{
//         const task = await Task.findById(_id)
//         res.status(404).send(task)
//     }catch(e){
//         res.status(500).send(e)
//     }
   
// })

// app.patch('/users/:id', async (req, res) => {

//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) 

//     if(!isValidOperation){
//         return res.status(404).send({ error: "Invalid Updates" })
//     }
//     try{
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(404).send(e)
//     }
// })

// app.patch('/tasks/:id', async (req, res) => {

//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['course', 'completed']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) 

//     if(!isValidOperation){
//         return res.status(404).send({ error: "Invalid Updates!"})
//     }
//     try{
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }catch(e){
//         res.status(404).send(e)
//     }
// })

// app.delete('/users/:id', async (req, res) => {

//     try{
//         const user = await User.findByIdAndDelete(req.params.id)
//         if(!user){
//             res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

// app.delete('/tasks/:id', async (req, res) => {

//     try{
//         const task = await Task.findByIdAndDelete(req.params.id)
//         if(!task){
//             res.status(404).send()
//         }
//         res.send(task)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5f410d15042f2113e4108e3a')
//     // await task.populate('owner').execPopulate()
//     // //Populate the data with the entire profile of user
//     // console.log(task.owner)

//     const user = await User.findById('5f410af818984937b8ba082c')
//     await user.populate('tasks').execPopulate()
//     //Populate the data with the entire profile of user
//     console.log(user.tasks)
// }
// main()

const multer = require('multer')
const upload = multer({ 
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        // if(!file.originalname.endsWith('.doc')){
        if(!file.originalname.match(/\.(doc|docs)$/)){
            return cb(new Error("Please upload a Word File"))
        }
        cb(undefined, true)
    }
 })

//  const errorMiddleWare = (req, res, next) =>{
//     throw new Error("From Middleware")
//  }

//  app.post('/uploads', upload.single('upload') ,(req, res) => {
//      res.send()
//  })

app.post('/uploads', upload.single('upload') ,(req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(404).send({error: error.message})
})

app.listen(port, () => {
    console.log("Server is running on " + port)
})