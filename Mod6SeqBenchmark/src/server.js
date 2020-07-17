const express = require ("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const db = require("./db")
const productRouter = require("./productRouter")
const reviewRouter = require("./reviewRouter")

const server = express()
server.use(cors())
server.use(express.json())

server.get("/", (req, res)=>{
    res.send("The server is running")
})

server.use("/products", productRouter)
server.use("/reviews", reviewRouter)

server.listen(process.env.PORT || 3003, () => console.log("Running on ", process.env.PORT || 3003))