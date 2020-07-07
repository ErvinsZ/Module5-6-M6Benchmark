const {Schema, model} = require("mongoose")

const studentSchema = new Schema({
    name: {
        type:  String,
        required: true
    },
    surname: {
        type:  String,
        required: true
    },
    email: {
        type:  String,
        required: true,
        lowercase: true
    },
    dateOfBirth: {
        type:  String,
        required: true
    },
    country: {
        type:  String,
        required: true
    }   

})

module.exports  = model("Student", studentSchema)