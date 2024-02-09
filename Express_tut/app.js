const express = require('express')

const myMiddleware69 = require('./Middlewares/middle69')
const myMiddleware70 = require('./Middlewares/middle70')

const morgan = require('morgan')
//Now express is top level function
//it have many method, so to use method we have to create variable
const app = express();

//We can use get, post, put, delete method on app now
//req-> request we get from user while they interact with our website
//res-> response that we send to user's account on specific request that they requested in req

//Whenever we need to create or update any data on DB in express, we need to parse that in JSON format
//For this parsing we need some mediator function and here comes, Middlewares-> this is function which connects 1 http request to another
//Middleware -> app.use()
//Flow of middleware:- Post method->Getting req from user as JS object-> this object converted to json format using below middleware -> Pass this JSON data as req to Post method-> goes to Post method -> Do necessary code to add that json data to our DB(here it is array of courses)
//Flow -- REQ from User -> Middleware1 -> Middleware2 -> .... ->Goes to specific Route-> goes to that Requested Method(get, post, put, delete)-> Response send back to User
app.use(express.json())


//Custom middleware
// app.use((req, res, next)=>{
//     console.log("I am custom middleware1")
//     next() //used to pass/forward the access to next middleware(route, methods are also type of middleware)
// })
// app.use((req, res, next)=>{
//     console.log("I am custom middleware2")
//     next() 
// })

//middleware import as module
// app.use(myMiddleware69)
// app.use(myMiddleware70)

//Third party middleware
// app.use(morgan('tiny'))

app.get('/', (req, res)=>{
    res.send("hello from ironfist's pc")
})

app.get('/about', (req, res)=>{
    res.send("we are in about page")
})
app.get('/contact', (req, res)=>{
    res.send("we are in contact page")
})
app.get('/courses', (req, res)=>{
    res.send(courses)
})

//Post method-> used for create/upgrade data of DB using server 

//To validate: Open postman-> select post method and add json data in body option -> send (this will add data to courses array)
//Go to get method in postman only-> localhost:3000/courses-> send-> you'll see your added element in that
app.post('/courses', (req, res)=>{
    console.log(req.body)
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    

    courses.push(course)
    res.send(course)
})

//Put method-> Used for updating already existing entries

app.put('/courses/:coursename', (req, res)=>{
    let course = courses.find(course=> course.name === req.params.coursename) //course.name (here we taking name of the course array that we made) and req.param.coursename(here we get check coursename attribute that we got from route in form of parameters(params) in request)
    if(!course) res.status(404).send("Error in this page or page is not existed")
    //Now we just want to update DB(here it is elements of array), using course variable
   
    console.log(req.body)
    course.id = req.body.id
    console.log(course.id)
    course.name = req.body.name // <request> is format, <body> is content(in postman we use that to write inputs) and <name> is json key that we use to add name
    //In course.name -> course will give whole element including id and name, so we select name attribute of that element and change that only while id remains same
    
    res.send(course)

})

//Delete-> as name suggest it is used to delete some data in DB
//Method 1
app.delete('/courses/:coursename', (req, res)=>{
    let UpdateCourses = courses.filter(course=>course.name !== req.params.coursename)

    courses = UpdateCourses
    res.send(courses)
})

//Method 2
app.delete('courses/:id', (req, res)=> {
    let course = courses.find(course => course.id === req.params.id)
    if(!course) res.status(404).send('Page is not available')

    const index = courses.indexOf(course)
    
    courses.splice(index, 1) // delete that element from main courses array
    res.send(course) // display deleted array element, as we initially story deleted element using id
})


//Route Parameters(dynamic routing)

// app.get('/courses/:id', (req, res)=>{
//     console.log(req.params) // this gives array of request that user requesting for using route
//     console.log(req.params.id)// this prints specific id that user requesting for , as we get array of req, so we selected id as key and it prints value of that id. (if in route-> /courses/1 then it prints 1, as id here is 1)
//     // res.send(req.params) // respond whole array(i.e {"id":"1"})
//     res.send(req.params.id)
// } )

app.get('/profile/:username', (req, res)=>{
    res.send(`Hello ${req.params.username}`)
    console.log(req.params) //Output- { username: 'ironfist' }, if profile/ironfist is passed by user
})

//Multiple Routes

let courses = [
    {id:1, name: 'Javascript'},
    {id:2, name: 'React'},
    {id:3, name: 'Java'},
    {id:4, name: 'Cpp'},
]


//taking id in route
// app.get('/courses/:id', (req, res)=> {
//     let course = courses.find(course=>course.id === parseInt(req.params.id)) // as req.params.id gives id in string format, but we have array of courses which have int type id, so converted to compare
//     console.log(course)
//     console.log(course.id)
//     console.log(course.name)
//     res.send(course.name)
// })

//taking coursename in route
app.get('/courses/:coursename', (req, res)=> {
    let course = courses.find(course=>course.name === req.params.coursename) // as req.params.id gives id in string format, but we have array of courses which have int type id, so converted to compare
    console.log(course) // give full element of that specific index, like for id:1 -> { id: 1, name: 'Javascript' }
    // console.log(course.id) // prints just id of that array element
    // console.log(course.name) // prints just name of that array element
   
   // Basic Error handling
    if(!course) res.status(404).send("This is not available")
    res.send(course.name)
})


//to start localhost or server to run our code

const port = process.env.PORT || 3000 //this will take any dynamic port that is assigned to this file, if no dynamic port assigned then it takes port-3000
app.listen(3000, ()=> console.log(`Port is running on ${port}`))

