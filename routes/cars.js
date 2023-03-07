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

carRouter.post('/new', (req,res) => {
    console.log('car body', req.body)
    let make = req.body.make
    let model = req.body.model
    let year = req.body.year
    let odometer = req.body.odometer

    const queryStatement  = `INSERT INTO cars (
        make, model, year, odometer
    ) VALUES ($1, $2, $3, $4) RETURNING *;`

    db.query(queryStatement, [make,model, year, odometer], (error, results) => {
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