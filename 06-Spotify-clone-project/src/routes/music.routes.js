const express = require('express');
const musicController = require('../controllers/music.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const multer = require('multer')

const upload = multer({storage: multer.memoryStorage()})


const router = express.Router();

router.post('/upload', authMiddleware.authArtist, upload.single("music"), musicController.createMusic) //if route is /upload then call musicController.createMusic function
router.post('/album', authMiddleware.authArtist, musicController.createAlbum) //if route is /album then call musicController.createAlbum function

router.get('/', authMiddleware.authUser, musicController.getAllMusics)   //if route is '/' then call musicController.getAllMusics function
router.get('/albums', authMiddleware.authUser, musicController.getAllAlbums)

router.get('/albums/:albumId', authMiddleware.authUser, musicController.getAlbumById)


module.exports = router