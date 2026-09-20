const express = require('express');
const noteModel = require('./models/note.model');

const app = express();
app.use(express.json());

/*API
POST - add new data
GET - fetch data from server
DELETE - delete perticular data from server
PATCH - modify existing data */


//POST API
app.post('/notes', async (req, res) => {
    const data = req.body;

    await noteModel.create({
        title: data.title,
        description: data.description,
    })

    res.status(201).json({
        message:"Note Created"
    })
})

//GET API
app.get('/notes', async (req, res) => {

    const notes = await noteModel.find(); //noteModel.find() gives you an (array of obj) which contains (all data of database)

    // const notes = await noteModel.findOne({ //noteModel.findOne() give you an object and it gives a perticular data instead of whole data
    //     title: "test_title"
    // });

    res.status(200).json({
        message:"Note Fetched Successfully",
        notes : notes
    })
})

//DELETE API
app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id

    await noteModel.findOneAndDelete({
        _id : id
    })

    res.status(200).json({
        message:"Note Deleted Successfully",
    })
})

app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    const title = req.body.title;

    await noteModel.findOneAndUpdate({
        _id : id
    },{
        title : title,
        description : description
    })

    res.status(200).json( {
        message:"Note Updated Successfully",
    })
})


module.exports = app;