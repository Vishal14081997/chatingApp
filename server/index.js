const express = require("express")
const dotenv = require("dotenv")
const dbConnect = require("./config/db")
const authRoute = require("./routes/auth.route")
const messageRoute = require("./routes/message.route")
const cors = require("cors")
const {initSocket} = require("./services/socket")

const { createServer } = require("http")

dotenv.config()

let PORT = process.env.PORT || 3000

const app = express()
const server = createServer(app)


app.use(express.json())
app.use(cors())

app.use("/api", authRoute)
app.use("/api", messageRoute)

app.get("/", (req, res) => {
  res.json({
    message: "Server is running"
  });
});

initSocket(server);

server.listen(PORT, () => {
  console.log(`server is running port ${PORT}`);
  dbConnect()
})