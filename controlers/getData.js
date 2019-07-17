const TrashCan = require('../models/trashCans')

module.exports = async (req, res) => {
    try {
        const can = await TrashCan.find({})

        let data = {
            trash1: can[0].filled,
            trash2: can[1].filled,
            trash3: can[2].filled
        }
        res.send(data)

    } catch (error) {
        console.log(error)
    }
}