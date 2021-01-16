const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstname :{
        type : String,
        required:true
    },
    lastname:{
        type : String
    },
    email: {
        type: String,
        required:true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required:true,
        trim: true,
    },
    city:{
        type : String 
    },
    state:{
        type:String
    },
    sex:{
        type:String
    },
    age:{
        type : Number ,
        validate(value){
            if(value <= 0){
                throw new Error('Under age !')
            }
        }
    },
    avatar:{
        type: Buffer
    }
})

// @ add virtual schema blog

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user)  throw new Error('Either email or password is incorrect')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Either email or password is incorrect')
    return user
}

userSchema.pre('save' , async function(next){
    if(this.isModified('password')) this.password = await bcrypt.hash(this.password,8)
    next()
})

const User =  mongoose.model('User',userSchema)

module.exports = User