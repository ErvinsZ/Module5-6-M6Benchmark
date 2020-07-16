const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")

const sequalize = require("../db")

const studentRouter = require("./routes/students")
const projectRouter = require("./routes/projects")

sequalize.authenticate().then(() => console.log("All good"))

const server = express()
server.use(cors())
server.use(express.json())

server.use("/students",studentRouter)
server.use("/projects",projectRouter)

server.listen(process.env.PORT|| 3003, () => console.log("server is running on", process.env.PORT||3003))