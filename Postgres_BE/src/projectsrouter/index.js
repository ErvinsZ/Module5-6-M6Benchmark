const express = require("express")
const db = require("../db")

const router = express.Router()

router.get("/:id", async (req, res)=>{
    const response = await db.query('SELECT * FROM projects WHERE studentid = $1', 
                                                                                        [ req.params.id ])

    if (response.rowCount === 0) 
        return res.status(404).send("Not found")

    res.send(response.rows)
})



module.exports = router