//package imports
import bcrypt from "bcrypt"

//file imports
import User from "../models/useModel.js"
import generateToken from "../utils/generateToken.js"

export const signUpController = async(req , res) =>{
    const {fullName , username , password , confirmPassword , gender } = req.body

    try{
        const userExist = await User.findOne({username})

        if(!userExist){
            return res.json("no user found with this username")
        }

        if(password != confirmPassword){
            return console.log("password and confirmPassword dont match")
        }

        let boyProfilePic = "https://avatar.iran.liara.run/public/boy"
        let girlProfilePic = "https://avatar.iran.liara.run/public/girl"


        //hash the password 
        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = new User({
            fullName,
            username,
            password : hashedPassword,
            gender,
            profilePic : gender == boy ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            await newUser.save()

            await generateToken(newUser._id , res)
            res.status(200).json({
                msg:"user created successfully",
                id:newUser._id,
                fullName:newUser.fullName,
                username: newUser.username,
                gender: newUser.gender
            })
        }else{
            res.json("error creating user")
        }

    }catch(error){
        console.log("error in signUpController" , error.mesasge)
        res.status(500).json("Internal Server error")
    }
}

export const loginController = async(req , res) =>{
    const {username , password} = req.body

    try{
        const userExist = await User.findOne({username})

        if(!userExist){
            return res.json("no user found with this username")
        }

        const verifyPassword = await bcrypt.compare(password , userExist.password)

        if(!verifyPassword){
            return res.json("incorrect password plz try again")
        }

        generateToken(userExist._id , res)

        res.json({
            msg:"user logged in successfully ",
            fullName:userExist.fullName,
            username:userExist.username,
            gender : userExist.gender
        })


    }catch(error){
        console.log("error in loginController" , error.message)
        res.json("Internal server error")
    }
}


export const logoutController = async(req , res) =>{
    try{
        res.cookie("jwt" , "" , {maxAge : 0})
        res.status(200).json("user logged out successfully")
    }catch(error){
        console.log("error in logout controller" , error.message)
        res.json("Internal server error")
    }
}