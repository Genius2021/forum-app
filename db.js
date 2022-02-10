require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        // await mongoose.connect(process.env.MONGO_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // }, () =>{console.log("MongoDB connection success")});
    
       await mongoose
        .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/blog", 
        {  useUnifiedTopology: true })
        .then(() => console.log( 'Database Connected' ))
        .catch(err => console.log(err));
   
    }catch(error){
        console.error("Database connection failed");
        process.exit(1);
    }
}


module.exports = connectDB;