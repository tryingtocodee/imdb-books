import mongoose from "mongoose"

const connectDb = async() =>{
    try{
       const connect =  await mongoose.connect(process.env.DB_CONNECTION)
        console.log("connected to mongo db " , connect.connection.name)

    }catch(error){
        console.log("error in dbConfig file" , error.message)
    }
}

export default connectDb