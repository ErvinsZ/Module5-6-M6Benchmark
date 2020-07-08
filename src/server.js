const express = require("express")
const studentsRoutes = require("./index")
const mongoose = require("mongoose")

const cors = require("cors")

const {
    notFoundHandler,
    badRequestHandler,
    genericErrorHandler,
  } = require("./errorHandlers")

port = 3003
const server = express()
server.use(cors())

server.use(express.json())



server.use("/students", studentsRoutes)



server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)


mongoose.connect("mongodb://localhost:27017/M6Day7HomeWork",
{useNewUrlParser: true,
useUnifiedTopology: true})
.then(
server.listen(port, () => {
    console.log(port)
})
)
