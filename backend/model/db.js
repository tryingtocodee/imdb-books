import mongoose from 'mongoose'


const userModel = new mongoose.Schema({
    userId:{
        type:Number,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
     type:String,
     unique:true,
     required:true   
    },
    city:{
        type:String
    },
    Date_of_birth:{
        type:Date
    }
},{
    timestamps:true
})

export default mongoose.model('User' , userModel)