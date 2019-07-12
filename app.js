const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//init the app
const app = express()

//import db URI
const db = require('./config/database').db

//setting up body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//connect to the db
mongoose.connect(db, { useNewUrlParser: true }, () => {
    console.log('database connected')
}).catch(err => console.log(err))

//routes
app.get('/', (req, res) => {
    res.json('server works')
})

app.listen(3000, () => {
    console.log('server started on port 3000')
})