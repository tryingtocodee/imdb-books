import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        requrired:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type: String,
        required:true,
        enums:["male" , "female"]
    },
    profilePic:{
        type:String,
        default:""
    }
}, {timestamp : true})

const User = mongoose.model("User" , userSchema)
export default User