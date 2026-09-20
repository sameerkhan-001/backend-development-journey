const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'artist'],    //enum is used to define role it means role can be user or artist not other then them mtlb ya to tole user ho sakta h ya artist iske alawa koi teesra role nhi ho sakta
        default: "user",
    }
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;