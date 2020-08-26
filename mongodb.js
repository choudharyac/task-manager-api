const mongodb = require('mongodb')

//Gives us access to connect to db and do crud operations
const MongoClient = mongodb.MongoClient

const ObjectId = mongodb.ObjectID

//Destructuring
// const { MongoClient, ObjectId } = require('mongodb')
const connectionURL = process.env.MONGO_DB
const databaseName = 'task-manager'

// const id = new ObjectId()
// console.log(id)
// console.log(id.id)
// console.log(id.id.toHexString())
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database!')
    }
    console.log("Connected")
    const db = client.db(databaseName)

    // db.collection("tasks").findOne({_id: new ObjectId("5f1a222c3d178c29c4030642")},(error, user) => {
    //     if(error){
    //         return console.log("some error")
    //     }
    //     console.log(user)

    // })

    //Find returns a cursor property which has many methods 
    //Find doesnt have callback but cursor does
    // db.collection("tasks").find({ completed: false }).toArray((error, tasks) => {
    //     if(error){
    //         return console.log("some error")
    //     }
    //     console.log(tasks)
    // })
    
    // db.collection('users').insertOne({
    //     // _id: id,
    //     name: "Neelima Maity",
    //     designation: "Accountant"
    // }, (error, result) => {
    //     if(error){
    //         return console.log("Unable to insert")
    //     }
    //     console.log(result.ops)
    // }) 
    
    // db.collection('tasks').insertMany([
    //     {
    //         course: "Vanilla Javascript",
    //         completed: false
    //     },
    //     {
    //         course: "Node JS",
    //         completed: false
    //     },
    //     {
    //         course: 'Vue JS',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log("Some problem occured, please try again!")
    //     }
    //     console.log(result.ops)
    // } )

    // db.collection("users").updateOne({_id: new ObjectId("5f1a1fe164c3250f80a498cb")},{
    //     $set:{
    //         name: "Siddarth"
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })

    // db.collection("tasks").updateMany({completed: false},{
    //     $set:{
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount)
    // }).catch((err) => {
    //     console.log(err)
    // })

    // db.collection("users").deleteOne({designation: "Accountant"}

    // ).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })
})