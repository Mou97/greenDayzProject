import mongoose, { mongo } from 'mongoose'

const trashCansSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    isFull: {
        type: Boolean,
        default: false
    },
    filled: {
        type: Number,
        default: '0'
    }
})

const TrashCan = mongoose.model("TashCan", trashCansSchema)
export default TrashCan