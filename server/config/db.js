const mongoose = require("mongoose")

const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connect");
        
    } catch (error) {
        console.log("mongodb error" , error);
    }
}
module.exports = dbConnect