const TrashCan = require('../models/trashCans')

module.exports = async (req, res) => {
    try {
        const can1 = await TrashCan.findOne({ trash_id: "1" })
        const can2 = await TrashCan.findOne({ trash_id: "2" })
        const can3 = await TrashCan.findOne({ trash_id: "3" })

        let data = {
            trash1: can1.filled,
            trash2: can2.filled,
            trash3: can3.filled
        }
        res.send(data)

    } catch (error) {
        console.log(error)
    }
}