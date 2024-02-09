const Joi = require('joi')
//const app = express()
const mongoose = require('mongoose')

//Schema
const studentSchema = mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50},

    isEnrolled: {
        type: Boolean,
        default: false
    },

    PhoneNum : {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 25
    }
})

//model
const Students = mongoose.model('Student', studentSchema)

//Validate data using Joi
async function validateData(student){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50),
        isEnrolled: Joi.boolean(),
        PhoneNum: Joi.number()
    })
    return schema.validate(student)
}

exports.Students = Students
exports.validateData = validateData
