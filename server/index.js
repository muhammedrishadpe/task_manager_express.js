const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const cors = require("cors");
require('dotenv').config();
const { todo } = require("node:test");
const connectDb = require("./config/db");

app.use(cors());
app.use(express.json());
connectDb();
const todoList = [
  {
    id: "123",
    todo: "test1",
    isCompleted: false,
  },
];

app.get("/api/todo", (req, res) => {
  res.status(200).json(todoList);
});
app.post("/api/todo", (req, res) => {
  const { todo } = req.body;

  if (!("todo" in req.body)) {
    res.status(400).json({
      message: `${JSON.stringify(
        req.body
      )}: This attribute is not accepted, Required attributes: todo`,
    });
    return;
  }

  const todoItem = {
    id: uuidv4(),
    todo: todo,
    isCompleted: false,
  };
  todoList.push(todoItem);
  res.json(todoList);
});
app.put("/api/todo", (req,res) => {
    
    const {id, todo, isCompleted} = req.body;
const isExist = todoList.find(data=> data.id ===id);
if(isExist) {
    todoList.forEach((todoItem) => {
        if(todoItem.id === id) {
            todoItem.todo = todo;
            todoItem.isCompleted = isCompleted || false;
        }
    });
    return res.json(todoList);
}

res.status(404).json({
    message: `Item with id:${id} does not exist`,
});
   
});

app.delete("/api/todo", (req,res) => {
const {id} = req.body;
const todoIndex = todoList.findIndex((todoItem) => todoItem.id === id);
if(todoIndex !== -1) {
    todoList.splice(todoIndex,1);
    return res.json(todoList);
};

res.status(404).json({message: "Item does not exist"})
});

app.all("*", (req, res) => {
  res.status(404).json("This page does not exist");
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(` server running on on http://localhost:${PORT}`));
