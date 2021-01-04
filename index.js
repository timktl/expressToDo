const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const todoModel = require("./schema/todoSchema");
require("./database/index.js");

app.use(bodyParser.json())

//Get all To Do
app.get("/",(req,res)=>{
    todoModel.find({})
    .exec((err, document) => {
      if (err) {
        return res.status(500).json({ message: "500 Internal Server Error: Unable to retrieve to do list" });
      }
      res.status(200).json(document);
    });
})

//Create new To Do
app.post('/', (req, res)=>{
    todoModel.create({
    item: req.body.item,
  },(err, doc)=>{
    if (err) {
      return res.status(500).json({ message: "500 Internal Server Error: Unable to create to do item \n", error: err });
    }
    res.status(200).json(doc);
  })
})

//Update To Do
app.put('/:itemId', (req, res)=>{
    // Prepare Project Details to be Updated
  let newItem = {
    $set: { 
      item: req.body.item, 
    },
  }

  todoModel.findByIdAndUpdate(
    req.params.itemId,
    newItem,
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(500).json({ message: "500 Internal Server Error: Unable to update item" });
      }
      return res.status(200).json(doc);
    }
  );
})

//Remove To Do
app.delete('/:itemId', (req, res)=>{
    todoModel.findByIdAndDelete(req.params.itemId, (err, doc) => {
    if (err) {
      return res.status(500).json({ message: "500 Internal Server Error: Unable to delete item" });
    }
    return res.status(200).json(doc);
  });
})

app.listen(5000,console.log("Server Started"))