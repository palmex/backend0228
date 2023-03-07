const express = require('express')
const db = require('../db')

var carRouter = express.Router()
carRouter.use(express.json())


carRouter.get('/all', (req,res) => {
    const queryStatement  = 'SELECT * FROM cars;'
    dbQuery(queryStatement, [], req,res)
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
    dbQuery(queryStatement, [make,model, year, odometer], req,res)
  
})

const dbQuery = (queryStatement, params, req, res) => {
    db.query(queryStatement, params, (error, results) => {
        if (error) {
            console.log(error)
          res.status(500).json(error)  
        } else {
            console.log(results.rows)
            res.status(200).json(results.rows)
        }
    }) 
}


module.exports = carRouter; 