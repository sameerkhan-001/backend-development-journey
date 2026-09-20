const express = require('express');
const authRoutes = require("./routes/auth.routes")
const cookieParser = require('cookie-parser')
const postRoutes = require('./routes/post.routes')

const app = express();
app.use(express.json()) //middleware
app.use(cookieParser())

app.use('/api/auth', authRoutes) //its a prefix: /api/auth se start hone wale route ki  requests ko authRoutes par bhejo
app.use('/api/auth', postRoutes)

module.exports = app;