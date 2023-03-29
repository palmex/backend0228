const express = require('express')
const db = require('../db')
var userRouter = express.Router()

userRouter.use(express.json())
// ------- functional ------------
// this is a full CRUD (create,read,update, delete) route for our users table in our database

// READ ALL USERS W/ PROPER PRIVILEGES
userRouter.get('/all', (req,res) => {
    console.log('admin header', req.headers.admin)
    if(req.headers.admin){
        queryStatement = " select * from users;"
        databaseCall(queryStatement, req, res)
    }
    else {
        res.status(403).json({ "forbidden":"PLease log in to continue"})
        // console.log(" header 'admin' is not true  - not authorized")
    }
   
})

// READ USER WITH USERID
userRouter.get('/:userId', (req,res) => {
    queryStatement = `SELECT * FROM users WHERE user_id = '${req.params.userId}';`
    console.log(queryStatement)
    databaseCall(queryStatement, req, res)
   
})

// DELETE USER WITH USERID
userRouter.delete('/:userId', (req,res) => {
    queryStatement = `DELETE FROM users WHERE user_id = '${req.params.userId}' RETURNING *;`
    console.log(queryStatement)
    databaseCall(queryStatement, req, res)

    
})

// CREATE USER
userRouter.post('/new', (req,res) =>{
    console.log(req.body)
    email = req.body.email 
    phone = req.body.phone
    queryStatement = `INSERT INTO users (name,email, phone) VALUES ('${ req.body.name}','${email}',${phone} ) RETURNING *;`
    databaseCall(queryStatement, req, res)
 
})

// UDPATE USER WITH USERID
userRouter.put('/update', (req,res) =>{
    console.log(req.body)
    userId = req.body.userId
    email = req.body.email 
    phone = req.body.phone
    queryStatement = `UPDATE users SET name = '${ req.body.name}', email = '${email}', phone = ${phone} WHERE user_id = '${userId}' RETURNING *;`
    console.log(queryStatement)
    databaseCall(queryStatement, req, res)

   
})

// using a function to call database instead of having this 
// db.query(queryStatement, (error, results) =>{
//     if (error){
//         res.status(500).json(error) 
//     } else
//     {res.status(200).json(results.rows)}
    
// } )
// in every endpoint

const databaseCall = (queryStatement, request, res) => {
    db.query(queryStatement, (error, results) =>{
        if (error){
            res.status(500).json(error) 
        } else
        {res.status(200).json(results.rows)}
        
    } )
}




// ------- ---------- ------------
module.exports = userRouter;