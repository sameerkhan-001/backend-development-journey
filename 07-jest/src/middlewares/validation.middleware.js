const {body, validationResult} = require('express-validator')

//Express-validator is used to validate data what data we got from the user that is correct or
//not if correct then status(200) otherwise throw error means data is not correct so status(400)


async function validateResult(req, res, next) {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next()
}

const registerUserValidationRules = [
    body("username")
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters"), 

    body("email")
        .isEmail()
        .withMessage("Invalid email address"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be atleast 6 characters long"),

    validateResult

]

module.exports = {registerUserValidationRules}