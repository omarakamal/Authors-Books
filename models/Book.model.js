const mongoose = require('mongoose')

/* const authorSchema = new mongoose.Schema({
    name:String,
    isAlive:Boolean
}) */

const bookSchema = new mongoose.Schema({
    title:String,
    description:{
        type:String,

    },
    author:[{type:mongoose.Schema.Types.ObjectId, ref:'Author'}],
    rating:Number
})

const Book = mongoose.model('Book',bookSchema)

module.exports = Book