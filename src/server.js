const express = require("express")
const studentsRoutes = require("./index")

const server = express()

server.use("/students", studentsRoutes)

server.listen(3001, () => {
    console.log("bla bla bla")
})

