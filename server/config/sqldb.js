const { Sequelize } = require("sequelize")
const sequelize = new Sequelize("chatingApp", "root", "Vishal@1408", {
host:"localhost",
dialect:"mysql"
})
module.exports = sequelize

