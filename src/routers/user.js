const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')
const router = new express.Router()

const avatars = multer({ 
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png)$/)){
            return cb(new Error("Only jpg and png are allowed!"))
        }
        cb(undefined, true)
    }
 })

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }catch(e){
        res.status(400).send(e)
    }
  
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        // res.send(user)
        // res.send({ user: user.getPublicData(), token })
        res.send({ user, token })
    }
    catch(e){
        
        res.status(400).send()
    }   
})

router.get('/users/me', auth, async (req, res) => {

    res.send(req.user)

    // try{
    //     const user = await User.find({})
    //     res.status(201).send(user)
    // }catch(e) {
    //     console.log(e)
    // }
})

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('Logout Successful')
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
    
})


// router.get('/users/:id', async (req, res) => {
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

// router.patch('/users/:id', async (req, res) => {

//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) 

//     if(!isValidOperation){
//         return res.status(404).send({ error: "Invalid Updates" })
//     }
//     try{
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//         const user = await User.findById(req.params.id)
//         updates.forEach((update) => {
//             user[update] = req.body[update]
//         })

//         await user.save()

//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(404).send(e)
//     }
// })

router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) 

    if(!isValidOperation){
        return res.status(404).send({ error: "Invalid Updates" })
    }
    try{
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        if(!req.user){
            return res.status(404).send()
        }
        res.send(req.user)
    }catch(e){
        res.status(404).send(e)
    }
})

// router.delete('/users/:id', async (req, res) => {

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

router.delete('/users/me', auth, async (req, res) => {

    try{
        // const user = await User.findByIdAndDelete(req.params.id)
        // if(!user){
        //     res.status(404).send()
        // }
        
        await req.user.remove()
        sendCancelEmail(req.user.email, req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/me/avatar', auth, avatars.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ widhth: 100, height: 100 }).png().toBuffer()
    req.user.avatar = buffer
    // req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(404).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set("ContentType", "image/png")
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})


module.exports = router
