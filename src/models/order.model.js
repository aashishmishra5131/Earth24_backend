const mongoose=require("mongoose");
const {Schema}=mongoose;

const orderSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OrderItem"
    }],
    orderDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    deliveryDate:{
        type:Date,
    },
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    },
     paymentDetails:{
        paymentMethod:{
        type:String,
       },
       transactionId:{
        type:String
       },
       paymentId:{
        type:String
       },
       paymentStatus:{
        type:String,
        default:"PENDING"
       }
     },
     totalPrice:{
        type:Number,
        required:true,
     },
     totalDiscountedPrice:{
        type:Number,
        required:true,
     },
     discounte:{
        type:Number,
        required:true,
     },
     orderStatus:{
        type:String,
        required:true,
        default:"PENDING"
     },
     totalItem:{
        type:Number,
        required:true,
     },
     createAt:{
        type:Date,
        default:Date.now(),
     },

});

const Order=mongoose.model("Order",orderSchema);

module.exports=Order;
