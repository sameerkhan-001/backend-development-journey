const express = require('express');
const authController = require('../controllers/auth.controller')


const router = express.Router();

//Register POST API
router.post('/register', authController.registerUser)   //if route is '/register' :-> call authController.registerUser function 

//Login POST APi
router.post('/login', authController.loginUser)   //if route is '/login' :-> call authController.registerUser function 

//Logout POST API
router.post('/logout', authController.logoutUser)

module.exports = router