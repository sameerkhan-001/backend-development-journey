const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const musicRoutes = require('./routes/music.routes')



const app = express();

app.use(express.json());    // middleware
app.use(cookieParser());  



app.use('/api/auth', authRoutes);   //its a prefix :- '/api/auth' se start hone wale route ki requests ko authRoutes par bhejo
app.use('/api/music', musicRoutes); //its also a prefix '/api/music' se start hone wale route ki requests ko musicRoutes par bhejo





module.exports = app