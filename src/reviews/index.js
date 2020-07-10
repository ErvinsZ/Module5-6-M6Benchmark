const express = require("express")
const q2m = require("query-to-mongo")
const reviewSchema = require("./schema")
const router = express.Router()


router.get("/", async (req, res, next) => {
    try {
      const query = q2m(req.query)
        const reviews = await reviewSchema.find(query.criteria, query.options.fields)
        .skip(query.options.skip)
        .limit(query.options.limit)
        .sort(query.options.sort)
        res.send({
          data: reviews,
          total: reviews.length,
        })
      } catch (error) {
        next(error)
      }
})

router.get("/:id", async(req, res, next) => {
    try {
        const id = req.params.id
        const review = await reviewSchema.findById(id)
        if (review) {
          res.send(review)
        } else {
          const error = new Error()
          error.httpStatusCode = 404
          next(error)
        }
      } catch (error) {
        console.log(error)
        next("Problem occurred while reading reviews list")
      }
})

router.post("/", async (req, res, next) => {
  try{
   const newReview = new reviewSchema(req.body)
   const response = await newReview.save()
   res.status(201).send(response)
  }catch(error){
   next(error)
  }
   
})

router.put("/:id", async(req, res, next) => {
   try {
       const review = await reviewSchema.findByIdAndUpdate(req.params.id, req.body)
       console.log(review)
       if (review) {
         res.send(review)
       } else {
         const error = new Error(`review with id ${req.params.id} not found`)
         error.httpStatusCode = 404
         next(error)
       }
     } catch (error) {
       next(error)
     }
})

router.delete("/:id", async(req, res, next) => {
   try {
       const review = await reviewSchema.findByIdAndDelete(req.params.id)
       if (review) {
         res.send("Deleted")
       } else {
         const error = new Error(`review with id ${req.params.id} not found`)
         error.httpStatusCode = 404
         next(error)
       }
     } catch (error) {
       next(error)
     }
})

module.exports = router