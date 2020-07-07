const express = require("express")
const studentSchema = require("./schema")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")
const router = express.Router()

const studentsFilePath = path.join(__dirname, "students.json")


router.get("/", async (req, res, next) => {
    try {
        const students = await studentSchema.find(req.query)
        res.send(students)
      } catch (error) {
        next(error)
      }
})

router.get("/:id", async(req, res, next) => {
    try {
        const id = req.params.id
        const student = await studentSchema.findById(id)
        if (student) {
          res.send(student)
        } else {
          const error = new Error()
          error.httpStatusCode = 404
          next(error)
        }
      } catch (error) {
        console.log(error)
        next("Problem occurred while reading students list")
      }
})

router.post("/", async (req, res, next) => {
   try{
    const newStudent = new studentSchema(req.body)
    const response = await newStudent.save()
    res.status(201).send(response)
   }catch(error){
    next(error)
   }
    
})

router.put("/:id", async(req, res, next) => {
    try {
        const student = await studentSchema.findByIdAndUpdate(req.params.id, req.body)
        console.log(student)
        if (student) {
          res.send("Ok")
        } else {
          const error = new Error(`Student with id ${req.params.id} not found`)
          error.httpStatusCode = 404
          next(error)
        }
      } catch (error) {
        next(error)
      }
})

router.delete("/:id", async(req, res, next) => {
    try {
        const student = await studentSchema.findByIdAndDelete(req.params.id)
        if (student) {
          res.send("Deleted")
        } else {
          const error = new Error(`Student with id ${req.params.id} not found`)
          error.httpStatusCode = 404
          next(error)
        }
      } catch (error) {
        next(error)
      }
})

module.exports = router 