const express = require('express')
const db = require('../db')

var carRouter = express.Router()
carRouter.use(express.json())


carRouter.get('/all', (req,res) => {
    const queryStatement  = 'SELECT * FROM cars;'
    dbQuery(queryStatement, [], req,res)
})

carRouter.get('/test/all', (req,res) => {
    const queryStatement  = 'SELECT * FROM cars;'
    console.log('1) before DB query')
    // dbQuery(queryStatement, [], req,res)
    let params = []

    // call-back function
    // cbfxn(input, (awaitedResponse) => {do something with awaited response})
    db.query(queryStatement, params, (error, results) => {
        console.log('3) DB has responded')
        if (error) {
            console.log(error)
          res.status(500).json(error)  
        } else {
            // console.log(results.rows)
            res.status(200).json(results.rows)
        }
        console.log('4) we responded to the user')
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
    dbQuery(queryStatement, [make,model, year, odometer], req,res)
  
})

carRouter.post('/update/:carId', (req,res) => {
    console.log('car Id', req.params.carId)
    let make = req.body.make
    let model = req.body.model
    let year = req.body.year
    let odometer = req.body.odometer

    const queryStatement  = `UPDATE cars SET
        make=$1, model=$2, year=$3, odometer=$4 WHERE car_id=$5 RETURNING *;`

    dbQuery(queryStatement, [make,model, year, odometer,req.params.carId], req,res)
})

carRouter.delete('/delete/:carId', (req,res) => {
    console.log('car Id', req.params.carId)
    let carId = req.params.carId
    const queryStatement  = `DELETE FROM cars WHERE car_id=$1;`
    dbQuery(queryStatement, [carId], req,res)

})


// Abstracted function for making all DB calls, to reduce code size
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