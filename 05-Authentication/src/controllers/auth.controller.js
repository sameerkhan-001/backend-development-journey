const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {

    const {username, email, password} = req.body    //destructuring

    const isUserAlreadyExists = await userModel.findOne({   //find user by email
        email
    })

    if(isUserAlreadyExists) {   //if user already exists return 
        return res.status(409).json({
            message: "User is already exists"
        })
    }

    const user = await userModel.create({   //store data in db
        username, email, password
    })

    //create token
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(201).json({
        message: "User Registered Successfully",
        user,
        
    })

}

module.exports = { registerUser }