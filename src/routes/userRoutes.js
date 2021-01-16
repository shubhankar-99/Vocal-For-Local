const express =  require('express')
const router = new express.Router()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const auth = require('../auth/auth')
var multer = require('multer')
var upload = multer().single('avatar')

router.get('/users/profile' , auth ,async(req,res)=>{
    res.send(req.user)
})

const secret = process.env.jwt_secret

router.post('/signup' ,async function (req,res){
    const user = new User(req.body)
    console.log(req.body)
    try {
        const token = jwt.sign({ _id: user._id.toString() } , secret)
        await user.save()
        res.status(201).send(token)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/login' , async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = jwt.sign({ _id: user._id.toString() } , secret)
        res.status(201).send(token)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.patch('/users',auth, upload , async (req,res)=>{
    const updates = Object.keys(req.body) 
    try{
        updates.forEach((update) => req.user[update] = req.body[update])
        if(req.file) req.user.avatar = req.file.buffer
        await req.user.save()
        res.send('Successful')
    }catch(e){
        res.status(401).send( req.user )
    }
})


module.exports = router