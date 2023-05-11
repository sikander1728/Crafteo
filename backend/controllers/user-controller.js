require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
    cloud_name: "dnrootmb9",
    api_key: "824925833253699",
    api_secret: "jYNI8UOtgW9h-nE_PyrpV_SWj9k"
});

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

    if (req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = ''
    }

    if (req.cookies[`${existingUser._id}`]) {
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
const getUser = async (req, res, next) => {
    const userId = req.id
    let user;
    try {
        user = await User.findById(userId, "-password")
    } catch (error) {
        return new Error(error)
    }
    if (!user) {
        return res.status(404).json({ message: "User Not Found!" })
    }
    return res.status(200).json({ user })
}

//email config
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "crafteo4you@gmail.com",
        pass: "bijcuguhmvlihglw"
    }
})

const logoUrl = cloudinary.url("https://res.cloudinary.com/dnrootmb9/image/upload/v1682958849/crafteo_sikander/web-logo_ywmy2w.png", {
    Crop: 'fill'
});

//sending link for the reset password
const sendloginlink = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    let username;

    try {
        console.log("enter in trycatch")
        const isuser = await User.findOne({ email: email })
        console.log(isuser)

        username = isuser.username

        //generating token for reset password
        const token = jwt.sign({ _id: isuser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '180s', }
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
                subject: `${username}, we've made it easy to get back to Crafteo`,
                html: `
                <div style="margin-top : 20px; margin-left :40px;">
                    <div style="width :80%;">
                        <img src="${logoUrl}"
                            alt="logo" height="33px">
                        <div style="margin-left :30px">
                            <h2>Hello ${username},</h2>
                            <p style="font-size: 18px; color: black">
                                We apologize for the inconvenience you're experiencing while attempting to log in to Crafteo.
                                We've received a message that you've forgotten your password. If this was you, 
                                you can get straight back into your account or reset your password now.
                                <br/> <b>The Link will Expires in 3 minutes. </b>
                                </p>
                            <div style="text-align: -webkit-center;">
                                <a href="http://localhost:3000/"
                                    style="background-color: #1f1f38; color: white; padding: 10px 20px; text-decoration: none; display: block;
                                    width : 240px; height : 25px; text-align: center; font-size: 18px;">Back to Login</a>
                                <a href="http://localhost:3000/resetPassword/${isuser.id}/${setUserVerifyToken.verifytoken}"
                                    style="background-color: #1f1f38; color: white; padding: 10px 20px; text-decoration: none; display: block;
                                    width : 240px; height : 25px; text-align: center; font-size: 18px; margin-top : 15px">Reset Your Password</a>
                            </div>
                        </div>
                    </div>
                </div>
                `
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(401).json({ message: "email not sent" })
                }
                else {
                    res.status(201).json({
                        message: "We've sent an email to you with a link to get back into your account."
                    })
                }
            })
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid User" })
    }
}

// resetPassword link verify api
const verifyForgotPasswordLink = async (req, res) => {
    const { id, token } = req.params;
    try {
        const authorizedUser = await User.findOne({ _id: id, verifytoken: token })
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (authorizedUser && verifyToken) {
            return res.status(201).json({ status: 201, authorizedUser })
        }
        return res.status(401).json({ status: 401, message: "User not exists" })
    } catch (error) {
        return res.status(401).json({ status: 401, error })
    }
}

//rest password
const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password, againpassword } = req.body;
    try {
        const authorizedUser = await User.findOne({ _id: id, verifytoken: token });
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!authorizedUser || !verifyToken) {
            return res.status(401).json({ message: 'Unauthorized User!' });
        }
        if (password !== againpassword) {
            return res.status(403).json({ message: "Passwords do not match" });
        }
        const newPassword = await bcrypt.hash(password, 12);
        const setNewUserPassword = await User.findByIdAndUpdate({ _id: id }, { password: newPassword }, { new: true });
        res.status(201).json({ status: 201, setNewUserPassword });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Error resetting password" });
    }
};

module.exports = { signup, signin, getUser, sendloginlink, verifyForgotPasswordLink, resetPassword }


