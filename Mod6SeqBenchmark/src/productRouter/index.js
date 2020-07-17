const express = require("express")
const db = require("../db")

const router = express.Router()

router.get("/", async(req, res)=>{

    const order = req.query.order || "asc"
    const offset = req.query.offset || 0
    const limit = req.query.limit || 10

    delete req.query.order
    delete req.query.offset
    delete req.query.limit

    let query = 'SELECT * FROM "products" '

    const params = []
    for (queryParam in req.query){
        params.push(req.query[queryParam])

        if(params.length === 1)
            query += `WHERE ${queryParam} = $${params.length} `
        else
            query += ` AND ${queryParam} = $${params.length} `
    }

    query += " ORDER BY name " + order

    params.push (limit)
    query += ` LIMIT $${params.length} `
    params.push(offset)
    query += ` OFFSET $${params.length}`
    
    console.log(query)

    const response = await db.query(query, params)
    res.send(response.rows)
})

router.get("/:id", async (req, res)=>{
    const response = await db.query('SELECT id, name, description, brand, imageUrl, price, category FROM "products" WHERE id = $1', 
                                                                                        [ req.params.id ])

    if (response.rowCount === 0) 
        return res.status(404).send("Not found")

    res.send(response.rows[0])
})

router.post("/", async (req, res)=> {
    const response = await db.query(`INSERT INTO "products" (name, description, brand, imageurl, price, category) 
                                     Values ($1, $2, $3, $4, $5, $6)
                                     RETURNING *`, 
                                    [req.body.name, req.body.description, req.body.brand, req.body.imageurl, req.body.price, req.body.category])
    
    console.log(response)
    res.send(response.rows[0])
})

router.put("/:id", async (req, res)=> {
    try {
        let params = []
        let query = 'UPDATE "products" SET '
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
    const response = await db.query(`DELETE FROM "products" WHERE id = $1`, [ req.params.id ])

    if (response.rowCount === 0)
        return res.status(404).send("Not Found")
    
    res.send("OK")
})



module.exports = router