const musicModel = require('../models/music.model')
const albumModel = require('../models/album.model')
const uploadFile = require('../services/storage.service')
const jwt = require('jsonwebtoken')


//only Artist user can create music
async function createMusic(req, res) {

    //destructuring
    const {title} = req.body;
    const file = req.file   //store file details 

    //get image from imagekit cloud provider
    const result = await uploadFile(file.buffer.toString("base64"));

    //create music details in db 
    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })

    res.status(201).json({
        message: "Music is Created Successfully",
        music : {
            id: music._id,
            uri : music.uri,
            title: music.title,
            artist: music.artist
        }
    })

}

//only Artist user can create album
async function createAlbum(req, res) {

        //destructuring from req data
        const {title, musics} = req.body

        //create album in mongo db data base
        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics: musics
        })
        
        res.status(201).json({
            message: "Album is created successfully",
            album : {
                id: album._id,
                artist: album.artist,
                musics: album.musics
            }
        })

}

//normal user can listen all the musics
async function getAllMusics(req, res) {
    const musics = await musicModel
    .find() //it gives all the musics from db
    .skip(1)    //it skip first one music
    .limit(2)   //it is limit can give at max 2 
    .populate("artist", "username, email");

    res.status(200).json({
        message: "Fetched all musics successfully",
        musics
    })
}

async function getAllAlbums(req, res) {
    const albums = await albumModel.find().select("title artist").populate("artist", "username email");

    res.status(200).json({
        message: "All albums fetched successfully",
        albums
    })
}

async function getAlbumById(req, res) {

    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics")

    return res.status(200).json({
        message: "Album fetched successfully",
        album: album,
    })

}


module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById }