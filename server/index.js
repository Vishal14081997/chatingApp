const express = require("express")
const dotenv = require("dotenv")
const dbConnect = require("./config/db")
const authRoute = require("./routes/auth.route")
const cors = require("cors")


dotenv.config()

let PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", authRoute )

app.listen(PORT, ()=>{
    console.log(`server is running port ${PORT}`); 
    dbConnect()
})