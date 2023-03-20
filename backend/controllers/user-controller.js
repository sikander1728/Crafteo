const User = require('../models/User')

const signup = async (req, res, next)=>{
    const {email, name, username, password} = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (error) {
        console.log(error)
    }
    if(existingUser){
        return res.status(403).json({message: "User Already Exist"})
    }


    const user = new User({
        email,
        name,
        username,
        password
    });

    try{
        await user.save()
    }catch(err){
        console.log(err)
    }
    return res.status(201).json({message: user}) 
}

exports.signup = signup
