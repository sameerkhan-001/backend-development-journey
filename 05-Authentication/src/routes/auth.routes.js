const express = require('express')
const authController = require("../controllers/auth.controller")

const router = express.Router()

//POST API /register
router.post('/register', authController.registerUser)    // /register par POST request aaye to registerUser controller ko call karo

router.get('/test', (req, res) => {
    console.log("Cookies:", req.cookies)

    res.json({
        message:"Test Route",
        cookies: req.cookies
    })
})

module.exports = router