const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    description : {
        type : String
    } ,
    title : {
        type : String,
        required : true
    } ,
    media : {
        type : Buffer
    } ,
    ownerName:{
        type:String
    },
    ownerCity:{
        type:String
    },
    ownerState:{
        type:String
    },
    likes : [{
        likedBy : {
            type : String
        }
    }],
    liked:{
        type:Boolean
    },
    likesCount:{
        type:Number
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    } 
} , {
    timestamps : true
})


blogSchema.methods.increaseLike = async function ( likedBy ) {
    this.likes = this.likes.concat({likedBy})
    this.likesCount = this.likes.length
    await this.save()
    return this.likesCount
}

blogSchema.methods.decreaseLike = async function(likedBy) {
    this.likes = this.likes.filter( (id) => { return id.likedBy !== likedBy } )
    this.likesCount = this.likes.length
    await this.save()
    return  this.likesCount
}

const Blog = mongoose.model( 'Blog' , blogSchema )

module.exports = Blog