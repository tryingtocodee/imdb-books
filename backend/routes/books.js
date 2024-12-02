import express from 'express'
import {getAllBooks , getBookWithId , updateBookWithId , deleteBookWithId , addBooks} from "../controllers/books.js"

const router = express.Router()

router.get('/books' , getAllBooks)

router.get('/books/:id' , getBookWithId)

router.post('/books/:id' , updateBookWithId)

router.delete('/books/:id' , deleteBookWithId)

//admins only // i can only admins manually 
router.post('/books/admin' , addBooks)


export default router