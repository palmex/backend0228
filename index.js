const express = require('express')

const app = express()
const port = 3000

app.use(express.json())


app.get('/', (req,res) => {
    console.log("Your first endpoint!")
    res.status(200).json({"succes": "true"})
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})