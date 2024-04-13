const mongoose= require("mongoose")

const connectDB= async()=>{
    try{
        const connectionInstance= await mongoose.connect(`${process.env.mongoDbUrl}`)
        console.log(`\n MongoDatabase connected !!`);
    }
    catch(error){
        console.log("MONGODB failed : ",error);
        process.exit(1);
    }
}
module.exports={connectDB};