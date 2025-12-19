//This code will contain the Express.js server setup and route definitions.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
//connecting mongo DB
mongoose.connect('mongodb://localhost:27017/todoApp')
.then(() => {
    console.log('Db Connected successfully!');
})
.catch((err) => {
    console.log('error!!)', err);
});

//creating a todo schema
const todoSchema = new mongoose.Schema({
    title :{
        required : true,
        type: String
    },
    description : String
});

//creating a todo model
const todoModel = mongoose.model('Todo', todoSchema);

//create a new todo item 

app.post('/todos',async(req,res) => {
    const{title, description} = req.body;
    /*const newTodo = {
        id : todos.length + 1,
        title,
        description

    };

    todos.push(newTodo);
    console.log('Todo item added:', newTodo);
    */
    try{
        const newTodo = new todoModel({title,description});
        await newTodo.save();
        res.status(201).json(newTodo);
    }
    catch(err){
        console.log('error');
        res.status(500).json({error: 'Internal Server Error'});

    }
    
})

//get all todo items
app.get('/todos',async(req,res) => {
    try{
        const todos = await todoModel.find();
        res.json(todos);
    }
    catch(err){
        console.log('error');
        res.status(500).json({error: 'Internal Server Error'});
    }
    res.json(todos)
});

// updating a todo item
app.put("/todos/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { title, description },
      
      { new: true } // return updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Deleting a todo item
app.delete("/todos/:id", async (req, res) => {
    try {
        
    
    const id = req.params.id;
    await todoModel.findByIdAndDelete(id);
    res.status(204).end();
} catch (err) {
        console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
    }
})


//define the port
const port = 8000;

app.listen(port, () => {
    console.log('Server is running on port',port);
})