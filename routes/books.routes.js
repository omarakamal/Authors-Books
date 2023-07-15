const Author = require('../models/Author.model')
const Book = require('../models/Book.model')

const router = require('express').Router()


//CRUD
//READ
//READ all of my documents in the database
router.get('/',(req,res)=>{
    //.populate to get the document related to the object id and plug in all the information for that document in our field
    Book.find().populate('author')
    .then((allBooks)=>{
        console.log(allBooks)
        res.render('all-books',{allBooks})
    })
    .catch(err=>{
        console.log(err)
    })
})


//CREATE

//exercise 2:
// import the authors model
//use the authors model to pass all the others to the create-book.hbs page


//for our get route for creating a new Book we need to pass all the authors
router.get('/create',(req,res)=>{
    Author.find()
    .then((allAuthors)=>{
        res.render('create-book',{allAuthors})

    })
})



//READ for 1 resource
router.get('/:id',(req,res)=>{
    
    console.log(req.params.id)
    Book.findById(req.params.id).populate('author')
    .then((oneBook)=>{
        res.render('book-info',oneBook)
    })
    .catch(err=>{
        console.log(err)
    })
})



router.post('/create',(req,res)=>{
    console.log(req.body)
    const {title,author,rating,description} = req.body
    Book.create({title,author,rating,description})
    .then((oneBook)=>{
        console.log(oneBook)
        return Author.findByIdAndUpdate(oneBook.author,{$push:{books:oneBook._id}})
    })
    .then((updatedAuthor)=>{
        console.log(updatedAuthor)
        res.redirect(`/books/`)

    })
    .catch((err)=>{
        console.log(err)
    })
})
/* 
router.post('/create', async (req,res)=>{
    const {title,author,rating,description} = req.body
    const newBook = await Book.create({title,author,rating,description})
    await Author.findByIdAndUpdate(newBook.author,{$push:{books:newBook._id}})
    res.redirect('/books')
})
 */

router.get('/:id/edit',(req,res)=>{
    console.log(req.params)
     Book.findById(req.params.id).populate('author')
     .then((oneBookToBeEdited)=>{
        console.log(oneBookToBeEdited)
        res.render('edit-book',oneBookToBeEdited)

     })
     .catch((err)=>{
        console.log(err)
     })
})

router.post('/:id/edit',(req,res)=>{
    console.log("req.body")
    console.log(req.body)
    console.log("req.params")
    console.log(req.params)

    const {title, author, rating, description} = req.body

    Book.findByIdAndUpdate(req.params.id,{title,author,rating,description})
    .then((updatedBook)=>{
        res.redirect('/books')
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/:id/delete',(req,res)=>{
    console.log(req.params)
    Book.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect('/books')
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router