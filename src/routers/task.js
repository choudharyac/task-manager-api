const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth,async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})
// router.post('/tasks', async (req, res) => {
//     const task = new Task(req.body)

//     try{
//         await task.save()
//         res.status(201).send(task)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })

// router.get('/tasks', auth, async (req, res) => {

//     try{
//         // const task = await Task.find({owner: req.user._id})
//         await req.user.populate('tasks').execPopulate()
//         res.status(201).send(req.user.tasks)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

//Get tasks?completed=true //Refactoring
//Get tasks?limit=2&skink=2
//Get tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {

    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
        // const task = await Task.find({owner: req.user._id})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                // sort: {
                //     createdAt: -1
                // }
            }
        }).execPopulate()
        res.status(201).send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

// router.get('/tasks', async (req, res) => {

//     try{
//         const task = await Task.find({})
//         res.status(201).send(task)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

router.get('/tasks/:id', auth, async (req, res) => {
    // console.log(req.params)
    const _id = req.params.id

    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
   
})

// router.get('/tasks/:id', async (req, res) => {
//     console.log(req.params)
//     const _id = req.params.id

//     try{
//         const task = await Task.findById(_id)
//         res.status(404).send(task)
//     }catch(e){
//         res.status(500).send(e)
//     }
   
// })

router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['course', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) 

    if(!isValidOperation){
        return res.status(404).send({ error: "Invalid Updates!"})
    }
    try{
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()
        res.send(task)
    }catch(e){
        res.status(404).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {

    try{
        const task = await Task.findByIdAndDelete({ _id: req.params.id, owner: req.user._id })
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

// router.delete('/tasks/:id', async (req, res) => {

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

// router.patch('/tasks/:id', async (req, res) => {

//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['course', 'completed']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) 

//     if(!isValidOperation){
//         return res.status(404).send({ error: "Invalid Updates!"})
//     }
//     try{
//         // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//         const task = await Task.findById(req.params.id)
//         updates.forEach((update) => {
//             task[update] = req.body[update]
//         })

//         await task.save()
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }catch(e){
//         res.status(404).send(e)
//     }
// })

// router.delete('/tasks/:id', async (req, res) => {

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


module.exports = router