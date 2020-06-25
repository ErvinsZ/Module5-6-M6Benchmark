const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")
const router = express.Router()

const studentsFilePath = path.join(__dirname, "students.json")


router.get("/", (request, response) => {
   
    const fileContent = fs.readFileSync(studentsFilePath)
    console.log(fileContent.toString())

    response.send(JSON.parse(fileContent))
})

router.get("/:id", (request, response) => {
    const fileContent = fs.readFileSync(studentsFilePath)
    const studentsArray = JSON.parse(fileContent.toString())
    console.log(studentsArray)

    console.log("ID:", request.params.id)
    const student = studentsArray.filter(
        (student) => student.id === parseInt(request.params.id)
    )
    console.log(student)
    response.send(student)
})

router.post("/", (request, response) => {
    console.log(request.body)
    const newUser = request.body

    const fileContent = fs.readFileSync(studentsFilePath)
    const studentsArray = JSON.parse(fileContent.toString())

    studentsArray.push(newUser)

    response.send(request.body)
})

router.put("/:id", (request, response) => {})

router.delete("/:id", (request, response) => {})

module.exports = router 