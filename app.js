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
        if (!err) {

            //example TODO: delete this 
            let msg = {
                trash_id: '1',
                filled: 70,
            }
            // publish
            client.publish(topic, JSON.stringify(msg))
        }
    })
})

client.on('message', async (topic, message) => {
    console.log(message.toString());
    message = JSON.parse(message)
    //save to db if there is a change
    try {

        const result = await TrashCan.findOneAndUpdate({ trash_id: message.trash_id }, { $set: { filled: message.filled } }, { new: true })
        if (result) {
            console.log(result + ' is saved to the db')
        }


    } catch (error) {
        console.log(error)
    }

})

//connect to the db
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false }, () => {
    console.log('database connected')
}).catch(err => console.log(err))

//routes
app.get('/', (req, res) => {
    res.send('server works')
})
app.post('/addtrashcan', addCanController)

server.listen(3000, () => {
    console.log('server started on port 3000')
})