const mongoose = require('mongoose')

const trashCansSchema = new mongoose.Schema({
    trash_id: {
        type: String
    },
    position: {
        type: String,
    },
    address: {
        type: String
    },
    isFull: {
        type: Boolean,
        default: false
    },
    filled: {
        type: String,
        default: '0'
    }
})

const TrashCan = mongoose.model("TashCan", trashCansSchema)
module.exports = TrashCan