//packagae imports
import express from "express" 
import dotenv from "dotenv"
//file imports
import userRoutes from "./routes/authRoutes.js"
import connectDb from "./dbConfig/dbConfig.js"

dotenv.config()
const app = express()
app.use(express.json())

const port = process.env.PORT

//routes
app.get("/" , (req , res)=>{
    req.json("hello from backend")
})

app.use("/api/auth" , userRoutes)


app.listen(port , ()=>{
    console.log("server is running on port" , port)
    connectDb()
})