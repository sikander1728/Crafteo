const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

const verifyToken = async (req, res, next)=>{
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    // console.log(token)
    if(!token){
        return res.status(401).json({message: "No token Found"})
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) =>{
        if(err){
            res.status(400).json({message: "Invalid Token"})
        }
        console.log(user.id)
        req.id = user.id
    } )
    next()
}

const getUser = async (req, res, next) =>{
    const userId = req.id
    let user;
    try {
        user = await User.findById(userId, "-password")
    } catch (error) {
        return new Error(error)
    }
    if(!user){
        return res.status(404).json({message: "User Not Found!"})
    }
    return res.status(200).json({user})
}


module.exports = {verifyToken, getUser}