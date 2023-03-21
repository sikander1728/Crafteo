require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// new user
const signup = async (req, res, next)=>{
    //requesting the sigup details from user
    const {email, name, username, password} = req.body

    //check for existing user
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (error) {
        console.log(error)
    }
    if(existingUser){
        return res.status(403).json({message: "User Already Exist"})
    }

    // encripting the password
    const hashedpassword = bcrypt.hashSync(password)

    //saving user detail
    const user = new User({
        email,
        name,
        username,
        password: hashedpassword
    });

    try{
        await user.save()
    }catch(err){
        console.log(err)
    }
    return res.status(201).json({message: user}) 
}

// user signin
const signin = async (req, res, next) =>{
    const {email, password} = req.body;
    // finding user in database
    let existingUser;
    try {
        existingUser = await User.findOne({email: email})
    } catch (err) {
        return new Error(err)
    }
    if(!existingUser){
        return res.status(400).json({
            message: "User Not Found!"
        })
    }

    // checking for the correct password
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect){
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    // passing token
    const token = jwt.sign(
        {
        id: existingUser._id
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30s"
        }
    )

    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: "lax"
    })

    return res.status(200).json({
        message: "Signin Successfully",
        user: existingUser,
        token
    })
}

module.exports = {signup , signin}

