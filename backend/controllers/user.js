require('dotenv').config()
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
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
const getUser = async (req, res, next) => {
    const userId = req.id
    let user;
    try {
        user = await User.findById(userId, "-password").populate("posts")
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

const logoUrl = cloudinary.url("https://res.cloudinary.com/dnrootmb9/image/upload/v1682958849/crafteo_sikander/web-logo_ywmy2w.png", {
    Crop: 'fill'
});

//sending link for the reset password
const sendloginlink = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    let username;

    try {
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

const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.id)

        const { email, name, username, avatar } = req.body;

        if (email) {
            user.email = email;
        }
        if (name) {
            user.name = name;
        }
        if (username) {
            user.username = username;
        }
        if (avatar) {
            if (user.avatar && user.avatar.public_id) {
                await cloudinary.uploader.destroy(user.avatar.public_id);
            }
            const myCloud = await cloudinary.uploader.upload(avatar, {
                folder: 'avatars'
            });
            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
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

const deleteProfile = async (req, res) => {
    try {
        const user = await User.findById(req.id);
        const posts = user.posts;
        const followers = user.followers;
        const following = user.following;
        const userId = user._id;

        await user.deleteOne();

        res.cookie("token", "", {
            expires: new Date(0),
            httpOnly: true,
        })

        //removing user posts
        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i]);
            await post.deleteOne();
        }

        // remove user from Followers following
        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById(followers[i]);

            const index = follower.following.indexOf(userId);
            follower.following.splice(index, 1);
            await follower.save();
        }

        // remove user from following followers
        for (let i = 0; i < following.length; i++) {
            const follows = await User.findById(following[i]);

            const index = follows.following.indexOf(userId);
            follows.followers.splice(index, 1);
            await follows.save();
        }

        res.status(201).json({
            message: "Profile Deleted!"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts");

        if (!user) {
            return res.status(404).json({
                message: "User Not Fond!"
            });
        }
        res.status(200).json({
            user,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    const loggedInUserId = req.id;
    try {
        const users = await User.find({ _id: { $ne: loggedInUserId } }).limit(5);

        res.status(200).json({
            users,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    signup, signin, getUser, sendloginlink,
    verifyForgotPasswordLink, resetPassword, followUnfollowUser, logout, updateProfile, deleteProfile, getUserProfile, getAllUsers
}


