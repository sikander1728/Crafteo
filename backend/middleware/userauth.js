const jwt = require('jsonwebtoken')
require('dotenv').config()

const isauthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("object", token)

        if (!token) {
            return res.status(401).json({ message: "Please Login First" });
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(400).json({ message: "Invalid Token" });
            }
            req.id = user.id;
            next();
        });

        return;
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//refresh token
const refreshToken = async (req, res, next) => {
    const cookiesObject = req.cookies;
    const cookiesString = JSON.stringify(cookiesObject)
    console.log("cookies-sent", cookiesString)
    if (cookiesString) {
        console.log("cookies-recieved", cookiesString)
        const oldToken = cookiesString.split("=")[1];
        if (!oldToken) {
            return res.status(400).json({ message: "Couldn't find token!" })
        }
        jwt.verify(String(oldToken), process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Authentication Failed" })
            }
            res.clearCookie(`${user.id}`)
            req.cookies[`${user.id}`] = ""

            const token = jwt.sign({ id: user.id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "35s" }
            )

            res.cookie(String(user.id), token, {
                path: '/',
                expires: new Date(Date.now() + 1000 * 30),
                httpOnly: true,
                sameSite: "lax"
            })

            req.id = user.id;
            next();
        })
    }
}


module.exports = { isauthenticated, refreshToken }