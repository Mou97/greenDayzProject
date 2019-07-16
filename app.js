const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http')
const path = require('path');
const mqtt = require('mqtt')
const ws = require('ws')

//init the app
const app = express()

//public file
app.use(express.static(path.join(__dirname, 'public')))


//import db URI
const db = require('./config/database').db

//import controllers
const addCanController = require('./controlers/addCan')

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
const topic = 'sensors/sensor'
const client = mqtt.connect(mqtt_url, { username: 'wdvebxdg', password: 'QMlVLEusK9yU', port: 12313 })

//----------------------------------------------------------------------
//mqtt events 
client.on('connect', () => {
    client.subscribe(topic, (err) => {
        console.log('subed')
    })
})

client.on('message', async (topic, message) => {
    // console.log(message.toString());
    message = JSON.parse(message)
    console.log(message)
    //save to db if there is a change
    try {
        message.sensor1 == 100 ? message.isFull_1 = true : message.isFull_1 = false
        message.sensor2 == 100 ? message.isFull_2 = true : message.isFull_2 = false
        message.sensor3 == 100 ? message.isFull_3 = true : message.isFull_3 = false


        const result1 = await TrashCan.findOneAndUpdate({ trash_id: 1 }, { $set: { filled: message.sensor1, isFull: message.isFull_1 } }, { new: true })
        const result2 = await TrashCan.findOneAndUpdate({ trash_id: 2 }, { $set: { filled: message.sensor2, isFull: message.isFull_2 } }, { new: true })
        const result3 = await TrashCan.findOneAndUpdate({ trash_id: 3 }, { $set: { filled: message.sensor3, isFull: message.isFull_3 } }, { new: true })

        if (result1) {
            console.log(result1 + ' is saved to the db')
        }
        if (result2) {
            console.log(result2 + ' is saved to the db')
        }
        if (result3) {
            console.log(result3 + ' is saved to the db')
        }


    } catch (error) {
        console.log(error)
    }

})

//connect to the db
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false }, () => {
    console.log('database connected')
}).catch(err => console.log(err));

//routes
console.log("sdf");
app.get('/', (req, res) => {
    console.log('render view')
    res.render('index')
});
app.post('/addtrashcan', addCanController)

server.listen(3000, () => {
    console.log('server started on port 3000')
})