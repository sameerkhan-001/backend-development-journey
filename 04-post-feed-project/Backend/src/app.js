const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/storage.service')
const postModel = require('./models/post.model')
const cors = require('cors')

const app = express();
app.use(cors())             //cors is a middleware is used to integrate frontend with backend
app.use(express.json());    //express.json() is a middleware is used to show text

const upload = multer({storage : multer.memoryStorage()});  //this is also a middleware use to store files 


app.post("/create-post", upload.single("image"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const result = await uploadFile(req.file.buffer);
    
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })

    res.status(201).json({
        message: "Post Created Successfully",
        post
    })
})

app.get("/posts", async (req, res) => {
    const posts = await postModel.find();

    res.status(200).json({
        message: "Post Fetched Successfully",
        posts
    })
})

module.exports = app;