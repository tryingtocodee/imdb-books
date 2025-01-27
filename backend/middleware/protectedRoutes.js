//package imports
import jwt from "jsonwebtoken"

//file imports
import User from "../models/useModel.js"

const protectedRoutes = async(req , res , next) =>{
    try{
        const getToken = req.cookie.jwt

        if(!getToken){
            return res.json("no token was found")
        }

        const verifyToken =  jwt.verify(getToken , process.env.JWT_KEY)

        if(!verifyToken){
            return res.json("invalid token plz logout and login again ")
        }

        const user = await User.findById(verifyToken.userId ).select("-password")

        if(!user){
            return res.json("wrong token ")
        }

        req.user = user
        next()

    }catch(error){
        console.log("error in protectedRoutes file " , error.message)
        res.json("Internal server error")
    }
}

export default protectedRoutes
