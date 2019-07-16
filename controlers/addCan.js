const TrashCan = require('../models/trashCans')

module.exports = async (req, res) => {
    const trash = req.body
    console.log(trash)
    let can = await TrashCan.create(trash)
    res.send('trash can created with success')
}