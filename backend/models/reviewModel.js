import mongoose, { Schema } from "mongoose"

const reviewSchema = new mongoose.Schema({
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Books",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    star:{
        type:Number,
        max:5,
        min:1,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Review = mongoose.model("Review" , reviewSchema)
export default Review