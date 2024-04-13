const mongoose=require("mongoose");
const {Schema} =mongoose;

const reviewSchema=new Schema({
    review:{
        type:String,
        required:true,
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

const Review=mongoose.model("Review",reviewSchema);

module.exports=Review;