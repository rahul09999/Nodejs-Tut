const express = require('express')
const {Students, validateData} = require('../models/studentModel')

const router = express.Router()
const port = process.env.PORT || 8000




//to get all student details
router.get('/', async (req, res)=> {
    const student = await Students.find()
    res.send(student)
})

//To get single student details
router.get('/:id', async (req, res)=> {
    //const student = await Student.find(std => std.id === req.params.id)
    //or
    const student = await Students.findById(req.params.id)
    res.send(student)
})

//To post new entry
router.post('/', async (req, res)=> {
    // const {error} = validateData(req.body)
    // console.log(error.message)
    //if(error)  return res.status(404).send(error)
    //validate inputs then post
    try {
        await validateData(req.body)
        const newData = new Students({
            name: req.body.name,
            isEnrolled: req.body.isEnrolled,
            PhoneNum: req.body.PhoneNum
        })
        await newData.save();
        res.send(newData);
        
    } catch (error) {
        console.log(error._message)
        return res.status(400).send(error.message) 
    }
})

//To put new entry in place of other student's entry
router.put('/:id', async (req, res)=> {
    const student = await Students.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isEnrolled: req.body.isEnrolled,
        PhoneNum: req.body.PhoneNum
    }, {new: true})
    if(!student) return res.status(404).send("The given student id not exist in DB")
    res.send(student)
})

//To delete any entry
router.delete('/:id', async (req, res)=> {
    const student = await Students.findByIdAndDelete(req.params.id)
    if(!student) return res.status(404).send("The given student id not exist in DB")
    res.send(student)
})

//Joi error validation


module.exports = router
//not getting .findbyID/update etc while code(intellisence issue may be)

//TypeError: Converting circular structure to JSON
//Solution: use async function with await to call DB data