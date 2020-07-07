const express = require("express")
const studentsRoutes = require("./index")
const mongoose = require("mongoose")

const server = express()

server.use(express.json())

port = 3003

server.use("/students", studentsRoutes)

mongoose.connect("mongodb://localhost:27017/M6Day7HomeWork",
{useNewUrlParser: true,
useUnifiedTopology: true})
.then(
server.listen(port, () => {
    console.log(port)
})
)
