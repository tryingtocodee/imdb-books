import jwt from "jsonwebtoken"

const generateToken = async(userId , res) =>{
    const token =  jwt.sign({userId} , process.env.JWT_JEY , {expiresIn : "15d"} )

    res.cookie("jwt" , token ,{
        maxAge : 15 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:"strict"
    })
}

export default generateToken