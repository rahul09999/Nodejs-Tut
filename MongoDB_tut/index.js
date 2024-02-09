//Function({ })-> it means we passing object (i.e '{  }' ) to tha function (i.e function( ) )
//[] -> means array AND     { }-> means object, so [{}]-> array of object
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/testData').
then(()=> console.log('Connection is established')).
catch((err)=> console.error('Cant Connect DB', err))

// In mongodb we first have to create schema of any DB, its just like blueprint of table that we want to create inDb
// Then we have to create model out of schema, you can say that it is just basic architecture or model of our project
// Out of model we create final DB content, its just like we making real thing out of architecture or prototype we made previously

// Schema

const courseSchema = new mongoose.Schema({
    name: String,
    creator: String,
    publishedDate: {type: Date, default: Date.now},
    Rating: Number,
    isPublished: Boolean
})

//Modal
const courseModel = mongoose.model('Course', courseSchema)


//create course data in DB
async function createCourse(){
    
    //DB content to add
    //Content1
    const course = new courseModel({
        name: 'Nodejs',
        creator: 'Ironfist',
        Rating: 4.5,
        isPublished: true
    })
    
    //Save content to our mongoDB compass(app of mongoDB)
    
    const result = await course.save()// used await bcz it take time to connect server with mongoDB compass and later store our data, so this task is not that fast so we added await thus code execution wait for this whole process to complete it first
    console.log(result)

    //Content2
    const course2 = new courseModel({
        name: 'Java',
        creator: 'raju',
        Rating: 4.1,
        isPublished: true
    })

    
    //Save content to our mongoDB compass(app of mongoDB)
    
    const result2 = await course2.save()// used await bcz it take time to connect server with mongoDB compass and later store our data, so this task is not that fast so we added await thus code execution wait for this whole process to complete it first
    console.log(result2)

    //Content3
    const course3 = new courseModel({
        name: 'Cpp',
        creator: 'kaju',
        Rating: 5.0,
        isPublished: true
    })

    
    //Save content to our mongoDB compass(app of mongoDB)
    
    const result3 = await course3.save()// used await bcz it take time to connect server with mongoDB compass and later store our data, so this task is not that fast so we added await thus code execution wait for this whole process to complete it first
    console.log(result3)

    //Content4
    const course4 = new courseModel({
        name: 'Python',
        creator: 'badam',
        Rating: 3,
        isPublished: true
    })

    
    //Save content to our mongoDB compass(app of mongoDB)
    
    const result4 = await course4.save()// used await bcz it take time to connect server with mongoDB compass and later store our data, so this task is not that fast so we added await thus code execution wait for this whole process to complete it first
    console.log(result4)

}

//get course data from DB

// async function getCourse(){
//     const courses = await courseModel.find({creator: 'Ironfist'}) // find gives whole object or data which has creator as ironfist
//     console.log(courses)
//     const data = await courseModel.find({creator: 'raju'}).select({name: 1})  // in select-> name means we selecting only name and 1 means true, so basically name:true, and other will be false automatically so true one get selected and add to that variable
//     console.log(data)
//     const dataset = await courseModel.find({creator: 'raju'}).select({name: 1}).sort({name:1})  // here sort:1 meas sort in ascending and sort:-1 means sort in descending
//     console.log(dataset)
// }

// createCourse()
// getCourse()

//Comparision Query Operator for mongoDB
//Command- use case
//(eq)-> (equal)
//(gt)-> (greater than)
//(gte)-> (greater than equal to)
//(lt)-> (less than)
//(ltw)-> (less than equal to)

//in -> used for range based search
//not in -> opposite of above

async function getCourse(){
    console.log("Prints courses which has rating === 4.5")
    const courses = await courseModel.find({Rating : 4.5})
    console.log(courses)

    console.log("Printing courses which has rating greater than equal to 4")
    const courses1 = await courseModel.find({Rating : {$gte : 4}})
    console.log(courses1)

    console.log("Printing courses which has specific value in range [ ]")
    const courses2 = await courseModel.find({Rating : {$in : [3,5]}})
    console.log(courses2)

    //Logical operator
    // or , and

    //or example
    console.log("Printing courses using OR ")

    //It means first find gte 4 then find if its either creator ironfist or rating 5 then print that content
    //O/p- course having creator: ironfist and rating: 5 both
    const coursesOr = await courseModel.find({Rating : {$gte : 4}}).or([{creator: 'Ironfist'}, {Rating: 5}])
    console.log(coursesOr)

    //AND example
    console.log("Printing courses using AND ")

    //It means first find gte 4 then find if its creator ironfist and rating 5(must satisfy both)
    //O/p-> [] empty array and both condition not satisfy
    const coursesAnd = await courseModel.find({Rating : {$gte : 4}}).and([{creator: 'Ironfist'}, {Rating: 5}])
    console.log(coursesAnd)

}

//getCourse()

//Update DB content

async function updateCourse(id){
    const course = await courseModel.findById(id)
    if(!course) return

    //content found with that id, so lets update it
    course.creator = 'Toothless'
    course.name = 'Typescript'

    const updatedCourse = await course.save()
    console.log(updatedCourse)

}
 
//updateCourse('659cf1cf2c649fa5c88186bf')

//Delete DB content

async function deleteCourse(id){
    const course = await courseModel.findByIdAndDelete(id)
    console.log(course)
}

//deleteCourse('659cf1cf2c649fa5c88186bf')


//Validation Check-> Catch any errors

const courseSchemaValidation = new mongoose.Schema({
    name: {type:String, required : true},
    creator: {type:String, required: true},
    publishedDate: {type: Date, default: Date.now},
    Rating: Number,
    isPublished: {type: Boolean, required: true}
})

//Model
const courseModelValidation = mongoose.model('CourseValidation', courseSchemaValidation)

//Create course using model
async function createCourseValidation(){
    const course = new courseModelValidation({
        //Only if you run this then it got validation error, let catch it using try/catch block
        name: 'Ironsfist'
    })
    // const courses = await course.save()
    // console.log(courses)

    //Solve validation using try catch
    //Method 1

    // try {
    //     const courses = await course.save()
    //     console.log(courses)
    // } catch (error) {
    //     console.log(error._message) //.message-> prints("CourseValidation validation failed: isPublished: Path `isPublished` is required., creator: Path `creator` is required.")
    //     //and ._message-> prints("CourseValidation validation failed")
    // }

    //method 2(works same as 1st method)
    try {
        await course.validate()
    } catch (error) {
        console.log(error._message)
        
    }
    
}

//createCourseValidation()

//Inbuilt data validators in mongoose, also custom validator built too

//Schema
const courseSchemaInbuiltVal = new mongoose.Schema({
    name: {type:String, required : true, minlength: 5, maxlength: 200 },
    //can add enum is validation too
    category: {
        type: String,
        required: true,
        enum: ['DSA', 'Database', 'Web', 'Mobile']
    },
    //custom validator, to check if anything satisfy or not
    tags: {type: Array, validate:{ //here validate is an object
        validator : function(tags){ // here validator is property of validate object
            return tags.length > 1;
        }
    }},
    creator: {type:String, required : true},
    publishedDate: {type: Date, default: Date.now},
    isPublished: {type: Boolean, required : true},
    Rating: {type: Number, required: function(){return this.isPublished} } // this make sure, if isPublishes true then only rating will be needed or else can be skip

})

//Model

const courseModelInbuiltVal = mongoose.model('CourseInbuiltVal', courseSchemaInbuiltVal)

//CreateCourse()

async function createCourseInbuiltVal(){
    const course = new courseModelInbuiltVal({
        name: 'MongoDB', //try name which is shorter then 5 char
        creator: 'Adam',
        tags: ['express'],
        //category: 'Backend', //this gives error, as its not in defined enum in our schema
        category: 'Database', // this works fine, as its in our enum
        isPublished: true, //as its true and will not provided rating, so it throw validation error
        Rating: 5
    })

    try {
        await course.validate()
        const result = await course.save()
        console.log(result)
    } catch (error) {
        console.log(error.message)    
        
        //what if we want to print of whole log ofn our error
        for(field in error.errors){
            console.log(error.errors[field])
        }
    }
    //enum-> enumerated data type, but what it means
    //an "enum" is a data type that is used to define a set of named constants. It stands for "enumerated type," and it allows a programmer to define a variable with a fixed set of possible values.
    //In short enum is data type which having only fixed value, we use it when we need to get only some specifc value
    //it is array of some fixed values
}

createCourseInbuiltVal()