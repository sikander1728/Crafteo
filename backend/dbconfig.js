require('dotenv').config()

const mongoose = require('mongoose')

exports.connectDatabase = ()=>{
    mongoose.connect(process.env.MONGODB_URI).then((con)=>{
        console.log(`Database Connected : ${con.connection.host}`)
    }).catch((err)=> {
        throw err
    })
}