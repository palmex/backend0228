const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const userRouter = require('./routes/Users')

app.use(express.json())
app.use(cors())
app.use('/users', userRouter)

const carRouter = require('./routes/cars')


app.use('/cars', carRouter)


app.get('/first', (req,res) => {
    console.log("Your first endpoint!")
    res.status(200).json({"success": "true"})
})

app.post('/echo',(req,res)=> {
    console.log('headers: ', req.headers)
    console.log('params: ', req.params)
    console.log('body: ', req.body)
    res.status(200).json(req.body)
})

app.get('/second', (req,res) => {
    console.log("Your second endpoint!")
    res.status(200).json({"success": "true"})
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})