const express = require("express");

const router = express.Router();
router.get("/", (req, res) => {
    res.status(200).json(todoList);
  });
  router.post("/", (req, res) => {
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
  router.put("/", (req,res) => {
      
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
  
  router.delete("/", (req,res) => {
  const {id} = req.body;
  const todoIndex = todoList.findIndex((todoItem) => todoItem.id === id);
  if(todoIndex !== -1) {
      todoList.splice(todoIndex,1);
      return res.json(todoList);
  };
  
  res.status(404).json({message: "Item does not exist"})
  });
  
  module.exports = router;