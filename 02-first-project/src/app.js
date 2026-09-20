//Server Creates here
const express = require('express');

const app = express();

app.use(express.json()) //middleware

const notes = [];

//Api Method
/*GET, POST, PATCH, DELETE */

// POST API -> creates new data on the server
app.post('/notes', (req, res) => {
    notes.push(req.body);

    res.status(201).json({
        message: "note is created successfully"
    })
})

//GET API :-> fetch data from server
app.get("/notes", (req, res) => {
    res.status(200).json({
        message: "notes fetched successfully",
        notes : notes
    })
})

//PATCH API :-> update/modify existing data
app.patch('/notes/:index', (req, res) => {
    const index = req.params.index;
    const description = req.body.description;
    const title = req.body.title;

    notes[index].description = description
    notes[index].title = title;

    res.status(200).json({
        message: "notes is updated successfully"
    })
})

//DELETE API :-> delete perticular data 
app.delete("/notes/:index", (req, res) => {
    const index = req.params.index

    delete notes[index];

    res.status(200).json({
        message : "note is deleted successfully"
    })
})



module.exports = app;


