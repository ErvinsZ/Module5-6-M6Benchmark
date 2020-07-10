const express = require("express")
const productsRoutes = require("./index")
const mongoose = require("mongoose")
const reviewsRoutes = require("./reviews/index")

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



server.use("/products", productsRoutes)
server.use("/reviews", reviewsRoutes)



server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)


mongoose.connect("mongodb://localhost:27017/M6Benchmark",
{useNewUrlParser: true,
useUnifiedTopology: true})
.then(
server.listen(port, () => {
    console.log(port)
})
)
