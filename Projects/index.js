const express = require('express')
const categories = require("./Routes/categories")
const students = require("./Routes/students");
const courses = require('./Routes/courses')
const app = express()
const mongoose = require('mongoose')
require("dotenv/config");
const mongo_connect = process.env.MONGO_CONNECT;
const port = process.env.PORT || 8000

mongoose.connect(`${mongo_connect}/learningPlatform`).
then(()=> console.log("DB connection established")).
catch((err)=> console.log('Cant able to connect DB', err))

app.use(express.json())
app.use('/api/categories', categories)
app.use('/api/students', students)
app.use('/api/courses', courses)


app.listen(port, ()=> console.log(`Port is running on ${port}`))

