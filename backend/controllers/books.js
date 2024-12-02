import User from "../model/db.js"
import Book from "../model/books.js"
import auth from "../middlewares/login_regis_middleware.js"

const getAllBooks = async(req ,  auth , res ) =>{
    try{
        const showAllBooks =  await Book.find() 


        res.json({msg:"showed books successfully" , books : showAllBooks})

    }catch(err){
        return res.json({msg:"error getting all books" , error:err.message})
    }
}

const getBookWithId = async(req , res ) =>{
    const bookId = req.params.id

    try{
        const bookWithId = await Book.find({bookId})

        if(!bookWithId){
            return res.json({msg:`there is not book with this id ${bookId}`})
        }

        return res.json({msg:`successfully found the bookk with id ${bookId}`})

    }catch(err){
        res.json({msg:`error getting book with id ${bookId}` , error:err.message})
    }
}


const updateBookWithId = async(req , res) =>{
    const bookId = req.params.id
    const updates = req.body
    try{

        const updateBook = await Book.updateBookWithId(bookId , updates , {new :true})

        if(!updateBook){
            return res.json({msg:`failed to update the book with  id${bookId}`})
        }
    }catch(err){
        return res.json({msg:`error updating the book with id ${bookId}` , error:err.message})
    }
}


const deleteBookWithId = async(req , res) =>{
const bookId = req.params.id

try{
    const findBook = await Book.findById({bookId})
    
    if (!findBook){
        return res.json({msg:`failed to find book with id ${bookId}`})
    }
    
    const deleteBook = await Book.deleteBookWithId({bookId})

    if(!deleteBook){
        res.json({msg:`failed to delete the book`})
    }

    return res.json({msg:`successfully deleted the book with id ${bookId}`})

}catch(err){
    return res.json({msg:`failed to delete the book with id ${bookId}` , error:err.message})
}
}


const addBooks = async(req , res) =>{
    
    const {bookTitle ,bookAuthor ,bookPages , bookOverview } = req.body
    try{
        const bookExists = await Book.find({bookTitle})

        if (bookExists){
            return res.json({msg:`book already exists`})
        }

        const newBook = new Book({
            bookTitle,
            bookAuthor,
            bookPages,
            bookOverview
        })

        await newBook.save()

        return res.json({msg:`book added successfully` , book:newBook})

    }catch(err){
        return res.json({msg:`failed to add the book `})
    }

}


export {getAllBooks , getBookWithId , updateBookWithId , deleteBookWithId , addBooks}