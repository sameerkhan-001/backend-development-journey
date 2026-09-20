const mongoose = require('mongoose'); // Import Mongoose

const postSchema = new mongoose.Schema({

    image: String,      // Defines image field as String
    caption: String     // Defines caption field as String

})

const postModel = mongoose.model("post", postSchema); // Creates model using postSchema

module.exports = postModel; // Exports model to use in other files