const express = require('express')

const app = express()
const port = 3000

app.use(express.json())


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