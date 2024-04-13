const app=require(".");
const {connectDB } = require("./config/db");
require('dotenv').config();

app.listen(process.env.PORT,async()=>{
    await connectDB();
    console.log(`Ecommerce api listing on PORT : ${process.env.PORT}`);
})