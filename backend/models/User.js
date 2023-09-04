const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    name: {
        type: String,
        required: [true, "Please enter name"],
        trim: true,
        minlength: [3, "Name must contain at least 3 characters"],
    },
    role: {
        type: String,
        default: 'buyer',
    },
    username: {
        type: String,
        required: [true, "Please enter username"],
        unique: true,
        validate: {
            validator: (val) => {
                return /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/.test(val);
            },
            message: "Invalid Username"
        }
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
    },
    avatar: {
        public_id: String,
        url: String,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    verifytoken: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)