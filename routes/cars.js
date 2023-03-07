const express = require('express')
var carRouter = express.Router()
carRouter.use(express.json())


carRouter.get('/all', (req,res) => {
    res.status(200).json({"all":"cars"})
})


module.exports = carRouter; 