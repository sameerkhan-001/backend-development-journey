const jwt = require('jsonwebtoken');

async function authArtist(req, res, next) {

    //get user token from cookies 
    const token = req.cookies.token

    //check is token is null means user have'nt login/register yet
    if(!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    //verify if token is valid and user is artist then proceed else return status 403 forbidden
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== "artist") {
            return res.status(403).json({ message: "You don't have access" })
        }

        req.user = decoded

        next();
    }
    catch(err) {
        console.log("Error: ", err);
        return res.status(401).json({ message: "Unauthorized" })
    }
}

async function authUser(req, res, next) {

    const token = req.cookies.token;

    //user not login.register yet
    if(!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    //if a user is not a valid user or an artist user then return status 403
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "user" && decoded.role !== "artist") {
            return res.status(403).json({ message: "You don't have access" })
        }

        req.user = decoded;

        next()
    }
    catch(err) {
        console.log("Error: ", err);
        return res.status(401).json({ message: "Unauthorized" })
    }

}

module.exports = { authArtist, authUser }