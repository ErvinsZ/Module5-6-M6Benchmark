const express = require("express")
const q2m = require("query-to-mongo")
const productSchema = require("./schema")
const router = express.Router()



router.get("/", async (req, res, next) => {
    try {
      const query = q2m(req.query)
        const products = await productSchema.find(query.criteria, query.options.fields)
        .skip(query.options.skip)
        .limit(query.options.limit)
        .sort(query.options.sort)
        res.send({
          data: products,
          total: products.length,
        })
      } catch (error) {
        next(error)
      }
})

router.get("/:id", async(req, res, next) => {
    try {
        const id = req.params.id
        const product = await productSchema.findById(id)
        if (product) {
          res.send(product)
        } else {
          const error = new Error()
          error.httpStatusCode = 404
          next(error)
        }
      } catch (error) {
        console.log(error)
        next("Problem occurred while reading products list")
      }
})

router.post("/", async (req, res, next) => {
   try{
    const newProduct = new productSchema(req.body)
    const response = await newProduct.save()
    res.status(201).send(response)
   }catch(error){
    next(error)
   }
    
})

router.put("/:id", async(req, res, next) => {
    try {
        const product = await productSchema.findByIdAndUpdate(req.params.id, req.body)
        console.log(product)
        if (product) {
          res.send("Ok")
        } else {
          const error = new Error(`product with id ${req.params.id} not found`)
          error.httpStatusCode = 404
          next(error)
        }
      } catch (error) {
        next(error)
      }
})

router.delete("/:id", async(req, res, next) => {
    try {
        const product = await productSchema.findByIdAndDelete(req.params.id)
        if (product) {
          res.send("Deleted")
        } else {
          const error = new Error(`product with id ${req.params.id} not found`)
          error.httpStatusCode = 404
          next(error)
        }
      } catch (error) {
        next(error)
      }
})

module.exports = router 