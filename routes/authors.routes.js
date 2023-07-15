const Author = require('../models/Author.model')

const router = require('express').Router()

router.get('/authors/create',(req,res)=>{
    res.render('create-author')
})

router.post('/authors/create',(req,res)=>{
    const {name,age} = req.body
    Author.create({name,age})
    .then(()=>{
        res.redirect('/books')
    })
})


router.get('/authors',(req,res)=>{
    Author.find().populate('books')
    .then((authors)=>{
        console.log(authors[3])
        res.render("all-authors",{authors})
    })
})

module.exports = router