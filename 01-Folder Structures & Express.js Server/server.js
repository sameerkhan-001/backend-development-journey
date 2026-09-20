const express = require('express');

const app = express();  //server ka instance create kar rhe h

app.get("/", (req, res) => {
    res.send("Hellow Word");
})

app.get("/about", (req, res) => {
    res.send("About Page");
})

app.listen(3000);

