const express = require("express")
const db = require("../db")
const students = require("../../students.json")

const router = express.Router()

router.post("/import", async (req, res) => {
   
    const response = await db.query('SELECT id  FROM "students"')

    
    const idList = response.rows.map(x => x.id)

    let total = 0
    let skipped = 0

    students.forEach(async student => { 
        if (idList.indexOf(student.id) === -1){ 
           
            await db.query(`INSERT INTO "students" (name, surname, email, dob) 
                                                Values ($1, $2, $3, $4)`, 
                                                [student.name, student.surname, student.email, student.dob])
            total++ 
        } 
        else { 
            console.log(`Element ${student.id} is already in the DB!`)
            skipped++ 
        }
    })

    res.send({ 
        added: total,
        skipped
    })
})

router.get("/", async(req, res)=>{
  
    const order = req.query.order || "asc"
    const offset = req.query.offset || 0
    const limit = req.query.limit || 10

   
    delete req.query.order
    delete req.query.offset
    delete req.query.limit

    let query = 'SELECT * FROM "students" ' 

    const params = []
    for (queryParam in req.query) {
        params.push(req.query[queryParam])

        if (params.length === 1)
            query += `WHERE ${queryParam} = $${params.length} `
        else
            query += ` AND ${queryParam} = $${params.length} `
    }

    query += " ORDER BY email " + order  

    params.push (limit)
    query += ` LIMIT $${params.length} `
    params.push(offset)
    query += ` OFFSET $${params.length}`
    
    console.log(query)

  
    const response = await db.query(query, params)
    res.send(response.rows)
})

router.get("/:id", async (req, res)=>{
    const response = await db.query('SELECT id, name, surname, email, dob FROM "students" WHERE id = $1', 
                                                                                        [ req.params.id ])

    if (response.rowCount === 0) 
        return res.status(404).send("Not found")

    res.send(response.rows[0])
})

router.post("/", async (req, res)=> {
    const response = await db.query(`INSERT INTO "students" (name, surname, email, dob) 
                                     Values ($1, $2, $3, $4)
                                     RETURNING *`, 
                                    [req.body.name, req.body.surname, req.body.email, req.body.dob ])
    
    console.log(response)
    res.send(response.rows[0])
})

router.put("/:id", async (req, res)=> {
    try {
        let params = []
        let query = 'UPDATE "students" SET '
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
    const response = await db.query(`DELETE FROM "students" WHERE id = $1`, [ req.params.id ])

    if (response.rowCount === 0)
        return res.status(404).send("Not Found")
    
    res.send("OK")
})

module.exports = router