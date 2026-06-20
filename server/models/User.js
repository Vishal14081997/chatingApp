const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: ""
    },
    googleId:{
        type:String
    }
}, {timestamps:true})
const User = mongoose.model("User", userSchema)
module.exports = User





// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/sqldb");

// const User = sequelize.define("User", {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     fullName: {
//         type: DataTypes.STRING(20),
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     profilePic: {
//         type: DataTypes.STRING,
//     },
//     googleId: {
//         type: DataTypes.STRING,
//     },
// }, { timestamps: true });
// module.exports = User;
