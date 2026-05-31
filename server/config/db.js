const mongoose = require("mongoose")

const dbConnect = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/chatingApp")
        console.log("mongodb connect");
        
    } catch (error) {
        console.log("mongodb error" , error);
    }
}
module.exports = dbConnect