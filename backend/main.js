import express from 'express'
import dotenv from 'dotenv'
import connectDb from './dbConfig/dbConfig.js'
import userRoutes from './routes/login_regis.js'

dotenv.config()
const app = express()
app.use(express.json())

connectDb()

app.use('/api/users/' , userRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port` , process.env.PORT)
})