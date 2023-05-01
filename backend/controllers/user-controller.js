require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")

// new user
const signup = async (req, res, next) => {
    //requesting the sigup details from user
    const { email, name, username, password } = req.body

    //check for existing user
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        res.status(500).json({
            Success: false,
            message: error.message
        })
    }
    if (existingUser) {
        return res.status(403).json({ message: "User Already Exists" })
    }

    let existingUsername
    try {
        existingUsername = await User.findOne({ username: username })
    } catch (error) {
        res.status(500).json({
            Success: false,
            message: error.message
        })
    }

    if (existingUsername) {
        return res.status(403).json({ message: "This username has already taken" })
    }

    //Validating the password
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(password)) {
        res.status(500).json({
            message: "Password must contain at leats 8 charaters, one digit and a special character"
        })
    }
    else {
        // encripting the password
        const hashedpassword = bcrypt.hashSync(password)

        //saving user detail
        const user = new User({
            email,
            name,
            username,
            password: hashedpassword
        });

        try {
            await user.save()
        } catch (err) {
            return res.status(500).json({
                Success: false,
                message: err.message
            })
        }
        return res.status(201).json({
            message: "Signup Successfully",
            user: user
        })
    }


}

// user signin
const signin = async (req, res, next) => {
    const { email, password } = req.body;
    // finding user in database
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return res.status(500).json({
            Success: false,
            message: err.message
        })
    }
    if (!existingUser) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }

    // checking for the correct password
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    // passing token
    const token = jwt.sign(
        { id: existingUser._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1hr" }
    )

    if(req.cookies[`${existingUser._id}`]){
        req.cookies[`${existingUser._id}`] = ''
    }

    if(req.cookies[`${existingUser._id}`]){
        req.cookies[`${existingUser._id}`] = ""
    }

    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 24 * 12 * 30),
        httpOnly: true,
        sameSite: "lax"
    })

    return res.status(200).json({
        message: "Signin Successfully",
        user: existingUser,
        token: token
    })
}


//get user
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

//email config
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "crafteo4you@gmail.com",
        pass: "bijcuguhmvlihglw"
    }
})

//sending link for the reset password
const sendloginlink = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(401).json({ message: "Please enter your email" })
    }

    try {
        const isuser = await User.findOne({ email: email })

        //generating token for reset password
        const token = jwt.sign({ _id: isuser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "120s" }
        )

        const setUserVerifyToken = await User.findByIdAndUpdate(
            { _id: isuser._id },
            { verifytoken: token },
            { new: true }
        );

        if (setUserVerifyToken) {
            const mailOptions = {
                from: "sikandersultan15@gmail.com",
                to: email,
                subject: "Sending email",
                text: `hello http://localhost:3000/${isuser.id}/${setUserVerifyToken.verifytoken}`,
                html: `
                `
            }

            transporter.sendMail(mailOptions , (error, info) => {
                if(error){
                    res.status(401).json({message: "email not sent"})
                }
                else{
                    res.status(201).json({message: "email sent"})
                }
            })
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid User" })
    }
}

module.exports = { signup, signin, getUser, sendloginlink }


