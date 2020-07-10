const {Schema, model} = require("mongoose")

const productSchema = new Schema({
    name: {
        type:  String,
        required: true,
    },
    description: {
        type:  String,
        required: true
    },
    brand: {
        type:  String,
        required: true,
        lowercase: true,
    },
    imageUrl: {
        type:  String,
        required: true,
    },
    price: {
        type:  Number,
        required: true
    },
    category: {
        type:  String,
        required: false
    }

})

productSchema.set('timestamps', true);

module.exports  = model("Product", productSchema)