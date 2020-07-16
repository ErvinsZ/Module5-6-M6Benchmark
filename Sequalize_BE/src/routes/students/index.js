const express = require("express")
const Student = require("../../models/students")
const Sequelize  = require("sequelize")
const sequelize = require("../../../db")
const Project = require("../../models/projects")

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit || 10
        const offset = req.query.offset || 0
        const order = req.query.order || "asc"

        delete req.query.limit
        delete req.query.offset
        delete req.query.order

        const students = await Student.findAll({
            where: {
                ...req.query
            },
            offset: offset,
            limit: limit,
            order: [
                ["name", order]
            ],
            include: Project
        })
        res.send(students)
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                id: req.params.id
            },
            include: Project
        })

        if (student)
            res.send(student)
        else
            res.status(404).send("Not found")

    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})



router.post("/", async (req, res) => {
    try {
        const student = await Student.create(req.body)
        res.send(student)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const student = await Student.update({
            ...req.body
        }, {
            where: { id: req.params.id }
        })

        if (student[0] === 1)
            res.send("OK")
        else
            res.status(404).send("Not found")

    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const result = await Student.destroy({
            where: {
                id: req.params.id
            }
        })

        if (result === 1)
            res.send("DELETED")
        else
            res.status(404).send("Not Found")

    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router;