const mongoose = require('mongoose')

async function connectDB() {

    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database is connected successfully...")
        
    }
    catch(error) {
        console.error("Database connection error: ", error);
    }
}

module.exports = connectDB