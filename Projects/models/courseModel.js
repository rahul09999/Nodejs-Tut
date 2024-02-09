const mongoose = require('mongoose')
const Joi = require('joi')
const {categorySchema} = require('../models/categoryModel')


//Schema
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxLength: 200
    },
    //here will add category data by importing categoryschema from categoryModel
    category: {
        //Below both type works same
        //type:  {name: {type: String, required: true, minlength: 2, maxlength: 30}},
        type: categorySchema,
        required: true
    },
    creator: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    }
})


//Model

const Course = mongoose.model('Course', courseSchema)

//Joi validation
function validateData(course){
    const schema = Joi.object({
        title: Joi.string().min(5).max(200).required(),
        creator: Joi.string().required().min(3),
        rating: Joi.number().required().min(0)
    })
    return schema.validate(course)
}

exports.Course = Course
exports.validateData = validateData