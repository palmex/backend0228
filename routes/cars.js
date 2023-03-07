const express = require('express')
const db = require('../db')

var carRouter = express.Router()
carRouter.use(express.json())


carRouter.get('/all', (req,res) => {
    const queryStatement  = 'SELECT * FROM cars;'
    db.query(queryStatement, (error, results) => {
        if (error) {
            console.log(error)
          res.status(500).json(error)  
        } else {
            console.log(results.rows)
            res.status(200).json(results.rows)
        }
    }) 
})


module.exports = carRouter; 