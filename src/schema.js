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
        lowercase: true,
        validate: {
            validator: async (value) => {
              if (!v.isEmail(value)) {
                throw new Error("Email is invalid")
              } else {
                const checkEmail = await UserModel.findOne({ email: value })
                if (checkEmail) {
                  throw new Error("Email already existant!")
                }
              }
            },
          },
    },
    dateOfBirth: {
        type:  String,
        required: true,
        validate:{
            validator: async(format) => {
                if(isDate(!v.input [format])) {
                    throw new Error("Incorrect Date format")
                }
            }
        }
    },
    country: {
        type:  String,
        required: true
    }   

})

module.exports  = model("Student", studentSchema)