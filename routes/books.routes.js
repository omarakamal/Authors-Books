const Book = require('../models/Book.model')

const router = require('express').Router()


//CRUD
//READ
//READ all of my documents in the database
router.get('/',(req,res)=>{
    Book.find()
    .then((allBooks)=>{
        res.render('all-books',{allBooks})
    })
    .catch(err=>{
        console.log(err)
    })
})


//CREATE

router.get('/create',(req,res)=>{
    res.render('create-book')
})



//READ for 1 resource
router.get('/:id',(req,res)=>{
    console.log(req.params)
    Book.findById(req.params.id)
    .then((oneBook)=>{
        res.render('book-info',oneBook)
    })
})

router.post('/create',(req,res)=>{
    console.log(req.body)
    const {title,author,rating,description} = req.body
    Book.create({title,author,rating,description})
    .then((oneBook)=>{
        console.log(oneBook)
        res.redirect(`/books/${oneBook._id}`)
    })
    .catch((err)=>{
        console.log(err)
    })
})
module.exports = router