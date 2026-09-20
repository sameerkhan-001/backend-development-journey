const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')  //we use hashing by using bcryptjs

async function registerUser(req, res) {

    const {username, email, password, role='user'} = req.body;  //destructuring 

    const isUserAlreadyExists = await userModel.findOne({

        //this is OR operator it used to check if username or email exists then return
        $or : [
            { username },
            { email }
        ]
    })

    //if user exists already in db return from here
    if(isUserAlreadyExists) {   
        return res.status(409).json({
            message: "User is already exists"
        })
    }

    //we use password hashing here we convert real password to a hash value
    //it prevents user real's password leak

    const hash = await bcrypt.hash(password, 10) //here 10 is a salt it delays attacker's attack

    //if user does not exist create new user in db
    const user = await userModel.create({ 
        username,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie('token', token);

    res.status(201).json({
        message: "User is registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })

}

async function loginUser(req, res) {

    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(!user) {
        return res.status(401).json({message: "Invalid credentials"})
    }

    //bcrypt.compare :-> used to convert user password to hash and then check curr filled password with existing hash password which is in database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(401).json({message: "Invalid credentials"})
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie('token', token);

    res.status(200).json({
        message: "User is logged in successfully",
        user : {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })

    
}

async function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: "User logged out successfully" })
}

module.exports = { registerUser, loginUser, logoutUser }