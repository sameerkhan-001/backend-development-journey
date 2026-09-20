const mongoose = require('mongoose');

async function connectDB() {
    
    await mongoose.connect("mongodb+srv://yt:hddGbDMxkrrkCIU9@sheriyansh-complete-bac.i11jxbg.mongodb.net/halley")

    console.log("Connected to DB")
}

module.exports = connectDB