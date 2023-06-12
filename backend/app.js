require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { connectDatabase } = require('./dbconfig')
const user = require('./routers/user')
const post = require('./routers/post')

const app = express()
app.use(express.json({limit: '50mb'}))
app.use(cors({ credentials: true, origin: "http://localhost:3000"})) 
app.use(cookieParser())
app.use('/api', user)
app.use('/api', post)

//Database call
connectDatabase()
 
app.get('/', (req, res)=>{
    res.json({message: "Request Arrived"})
})

//Server PORT
const port = process.env.PORT || 5000

app.listen(port, (req, res)=>{
    console.log('server is running on port', port)
})
