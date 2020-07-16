const express = require("express")
const Project = require("../../models/projects")

const router = express.Router()

router.get("/:id", async (req, res)=>{
    try{
        res.send(await Project.findAll({
            where: {
                studentid: req.params.id
            }
        }))
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

router.post("/:id", async (req,res)=>{
    try{
        res.send(await Project.create({
            ...req.body,
            studentid: req.params.id
        }))
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

router.put("/:projectid", async (req, res)=>{
    try{
        delete req.body.studentid 
        delete req.body.id 

        const result = await Project.update({ 
            ...req.body  
        }, {
            where: { 
                id: req.params.projectid
            }
        })

        if (result[0] === 1) 
            res.send("OK") 
        else 
            res.status(404).send("Not found") 
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

router.delete("/:projectid", async (req, res)=>{
    try{
        res.send(await Project.destroy({
            where: { id: req.params.projectid }
        }))
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router