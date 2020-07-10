const {Schema, model} = require("mongoose")

const reviewSchema = new Schema({
    comment: {
        type:  String,
        required: true
    },
    rate: {
        type:  Number,
        required: true
    },

})

module.exports  = model("Review", reviewSchema)