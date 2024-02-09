const mongoose = require('mongoose')

//Used for error validation
const Joi = require('joi')


//Mongo Schema design
const categorySchema = new mongoose.Schema({ //S capital in Schema
    name: {type: String, required: true, minlength: 2, maxlength: 30}

})

//model
const category = mongoose.model('Category', categorySchema)


//Error validation for post

function validateData(category){
    const schema = Joi.object({
        name: Joi.string().min(3).required() // make sure that body string(name) is  >=3
    })
    return schema.validate(category)
}

exports.category = category
exports.validateData = validateData
exports.categorySchema = categorySchema