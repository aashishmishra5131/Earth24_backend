const express=require("express")

const cors=require("cors")

const app=express();
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    return res.status(200).send({message:"Welcome to ecommerce api - node",status:true})
})

const authRouters=require("./routes/auth.route.js")
app.use("/auth",authRouters);

const userRouters=require("./routes/user.route.js")
app.use("/api/users",userRouters);

const productRouter=require("./routes/product.route.js")
app.use("/api/products",productRouter);

const adminProductRouter=require("./routes/adminProduct.route.js");
app.use("/api/admin/product",adminProductRouter);

const cartRouter=require("./routes/cart.route.js")
app.use("/api/cart",cartRouter);

const cartItemsRouter=require("./routes/cartItems.route.js")
app.use("/api/cartItems",cartItemsRouter);

const orderRouter=require("./routes/order.route.js")
app.use("/api/orders",orderRouter);

const adminOrderRouter=require("./routes/adminOrder.route.js")
app.use("/api/admin/orders",adminOrderRouter);

const reviewRouter=require("./routes/review.route.js")
app.use("/api/review",reviewRouter);

const ratingRouter=require("./routes/rating.route.js")
app.use("/api/rating",ratingRouter);

module.exports=app;

