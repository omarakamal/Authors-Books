const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name:String,
    age:Number,
    books:[{type:mongoose.Schema.Types.ObjectId, ref:'Book'}],
})

const Author = mongoose.model('Author',authorSchema)

module.exports = Author



//Exercise 1:

//Create a route.js page for the author
// have it render a form for posting a new author
// create a route for posting that will create the new author