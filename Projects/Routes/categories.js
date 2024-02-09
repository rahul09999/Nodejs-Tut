const express = require('express')
const router = express.Router()
const {category, validateData} = require('../models/categoryModel')
//const string = require('joi/lib/types/string')
const port = process.env.PORT || 8000


//router.use(express.json())



//static data
// let categories = [
//     {id: 1 , name: 'Web'},
//     {id: 2, name: 'Mobile'},
//     {id: 3, name: 'Frontend'}
// ]

//api to get all courses
router.get('/', async (req, res)=>{
    let categories = await category.find()
    res.send(categories)
    //console.log(categories[0].id)
})


//api to get specific course using id
router.get('/:id', async (req, res)=>{
    const course = await category.findById(req.params.id)
    console.log(course)
    res.send(course)
    
    //or
    // const courseID = parseInt(req.params.id)
    // const courses = category.find(course=> course.id === courseID)
    // console.log(courses)
    // console.log(courses.id)
    // res.send(courses)
})

//Post-> add new course in categories

router.post('/', async (req, res)=>{

    //Validate data
    const {error} = validateData(req.body)
    //console.log(error)
    //console.log(error.details[0])
    if(error)  return res.status(404).send(error.details[0].message)

    const newData = new category({
        name: req.body.name,
        //as below is not mentioned in schema thus it doesn't picked up by mongodb
        // test: 1,
        // pet: 2,
        // cat: 5
    })
    await newData.save()
    res.send(newData)

    //for static data
    // const category = {
    //     id: categories.length+1,
    //     name: req.body.name
    // }
    // categories.push(category)
    //res.send(category) // send just particular entry which is posted
})

//Put-> update existing element of array

router.put('/:id', async (req, res)=>{
    const {error} = validateData(req.body)
    if(error) res.status(400).send(error.details[0].message)

    const result = await category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true}) // new:true means whenever we get the data, it should be new and updated data
    if(!result) return res.status(404).send("The category not exists")

    //for static DB
    //const category = categories.find(course => course.id === parseInt(req.params.id))
    // category.id = req.body.id
    // category.name = req.body.name

    res.send(result)

})

//Delete-> delete an specific entry of categories

router.delete('/:id', async (req, res)=> {
    const result = await category.findByIdAndDelete(req.params.id)
    if(!result) return res.status(404).send("The category not exists").f
    
    //For static DB
    //const category = categories.find(course => course.id === parseInt(req.params.id))
    // const index = categories.indexOf(category)
    // categories.splice(index, 1);
    // console.log(category);

    res.send(result);
})




module.exports = router