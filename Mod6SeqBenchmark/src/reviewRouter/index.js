const express = require("express")
const db = require("../db")
const router = express.Router()




router.get("/", async (req, res)=>{
    const response = await db.query('SELECT * FROM reviews')
    res.send(response.rows)
})

router.get("/:id", async (req, res)=>{
    const response = await db.query('SELECT * FROM reviews WHERE productid = $1', [ req.params.id ])

    if (response.rowCount === 0) 
        return res.status(404).send("Not found")

    res.send(response.rows)
})

router.post("/:id", async (req, res)=> {
    const response = await db.query(`INSERT INTO "reviews" (comment, rate, productid) 
                                     Values ($1, $2, $3)
                                     RETURNING *`, [req.body.comment, req.body.rate, req.body.productid])
    
    console.log(response)
    res.send(response.rows[0])
})

router.put("/:id", async (req, res)=> {
    try {
        let params = []
        let query = 'UPDATE "reviews" SET '
        for (bodyParamName in req.body) {
            query +=
                (params.length > 0 ? ", " : '') + 
                bodyParamName + " = $" + (params.length + 1) 

            params.push(req.body[bodyParamName]) 
        }

        params.push(req.params.id) 
        query += " WHERE id = $" + (params.length) + " RETURNING *" 
        console.log(query)

        const result = await db.query(query, params)
        
        
        if (result.rowCount === 0) 
            return res.status(404).send("Not Found")

        res.send(result.rows[0]) 
    }
    catch(ex) {
        console.log(ex)
        res.status(500).send(ex)
    }
})

router.delete("/:id", async (req, res) => {
    const response = await db.query(`DELETE FROM "reviews" WHERE id = $1`, [ req.params.id ])

    if (response.rowCount === 0)
        return res.status(404).send("Not Found")
    
    res.send("OK")
})


module.exports = router