const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http')
const path = require('path');
const mqtt = require('mqtt')


//init the app
const app = express()

//public file
app.use(express.static(path.join(__dirname, 'public')))


//import db URI
const db = require('./config/database').db

//import controllers
const addCanController = require('./controlers/addCan')
const getDataController = require('./controlers/getData')

//import schemas 
const TrashCan = require('./models/trashCans')

//setting up body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//views 
app.use(require('express-edge'))
app.set('views', path.join(__dirname, 'views'))
//-------------------------------------------------------------
//web sockets
const server = http.createServer(app)

// connecting to the broker
const mqtt_url = require('./config/database').mqtt
const mqttInfo = require('./config/mqttInfo').mqtt
const topics = ['esisbaprojtest/1', 'esisbaprojtest/2', "esisbaprojtest/3"]
const client = mqtt.connect(mqtt_url)

//----------------------------------------------------------------------
//mqtt events 
client.on('connect', () => {
    client.subscribe(topics[0], (err) => {
        console.log('subed1')
    })
    client.subscribe(topics[1], (err) => {
        console.log('subed2')
    })
    client.subscribe(topics[2], (err) => {
        console.log('subed3')
    })
})

client.on('message', async (topic, message) => {
    // console.log(message.toString());
    message = JSON.parse(message)
    console.log(message)
    //save to db if there is a change
    try {
        switch (topic) {
            case "esisbaprojtest/1":
                await TrashCan.findOneAndUpdate({ trash_id: '1' }, { $set: { filled: message, isFull: message == 100 } }, { new: true })
                break;

            case "esisbaprojtest/2":
                await TrashCan.findOneAndUpdate({ trash_id: '2' }, { $set: { filled: message, isFull: message == 100 } }, { new: true })
                break;

            case "esisbaprojtest/3":
                await TrashCan.findOneAndUpdate({ trash_id: '3' }, { $set: { filled: message, isFull: message == 100 } }, { new: true })
                break;

        }


    } catch (error) {
        console.log(error)
    }

})

//connect to the db
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false, useFindAndModify: false }, () => {
    console.log('database connected')
}).catch(err => console.log(err));

//routes
app.get('/', async (req, res) => {
    const cans = await TrashCan.find({});
    res.render('index', { cans });
});
app.get('/api/getdata', getDataController)

app.post('/addtrashcan', addCanController)


server.listen(3000, () => {
    console.log('server started on port 3000')
})