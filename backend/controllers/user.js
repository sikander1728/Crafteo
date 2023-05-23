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
        { expiresIn: "1d" }
    )

    // if (req.cookies[`${existingUser._id}`]) {
    //     req.cookies[`${existingUser._id}`] = ''
    // }

    if (req.cookies[`${existingUser._id}`]) {
        res.clearCookie(`${existingUser._id}`)
    }

    res.cookie("token", token, {
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "lax"
    })

    return res.status(200).json({
        message: "Signin Successfully",
        user: existingUser,
        token: token
    })
}

//logout user
const logout = async (req, res) => {
    try {
        res.status(201).cookie("token", "", {
            expires: new Date(0),
            httpOnly: true,
        }).json({
            message: "Logged Out!"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//get user
const getUser = async (req, res, next) =>{
    const userId = req.id
    let user;
    try {
        user = await User.findById(userId, "-password")
        if (!user) {
            return res.status(404).json({ message: "User Not Found!" })
        }
        return res.status(200).json({ user })
    } catch (error) {
        return new Error(error)
    }
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

const followUnfollowUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.id);

        if (!userToFollow) {
            return res.status(404).json({
                message: "User Not Found!"
            })
        }

        if (loggedInUser.following.includes(userToFollow._id)) {
            const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
            loggedInUser.following.splice(indexfollowing, 1);

            const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);
            userToFollow.followers.splice(indexfollowers, 1);

            await loggedInUser.save();
            await userToFollow.save();

            res.status(201).json({
                message: "User Unfollowed!"
            })
        } else {
            loggedInUser.following.push(userToFollow._id);
            userToFollow.followers.push(loggedInUser._id);

            await loggedInUser.save();
            await userToFollow.save();

            res.status(201).json({
                message: "User Followed!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateProfile = async (req,res) => {
    try {
        const user = await User.findById(req.id)
        
        const {email, name, username} = req.body;
        
        if(email){
            user.email = email;
        }
        if(name){
            user.name = name;
        }
        if(username){
            user.username = username;
        }

        await user.save();

        res.status(200).json({
            message: "Profile Updated"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

module.exports = {
    signup, signin, getUser, sendloginlink,
    verifyForgotPasswordLink, resetPassword, followUnfollowUser, logout, updateProfile
}


