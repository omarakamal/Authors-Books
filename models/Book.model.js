const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:String,
    description:{
        type:String,
    },
    author:String,
    rating:Number
})

const Book = mongoose.model('Book',bookSchema)

module.exports = Book