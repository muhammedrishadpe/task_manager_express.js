const express = require("express");

const router = express.Router();

const Todo = require("../models/todoModel");
const { error } = require("console");

const todoList = [
    {
      id: "123",
      todo: "test1",
      isCompleted: false,
    },
  ];

router.get("/", async (req, res) => {
  const todoList = await  Todo.find();
    res.status(200).json(todoList);
  });
  router.post("/", async(req, res) => {
         // if (!("todo" in req.body)) {
          //   res.status(400).json({
              //     message: `${JSON.stringify(
                  //       req.body
                  //     )}: This attribute is not accepted, Required attributes: todo`,
                  //   });
                  //   return;
                  // }
                  try {
      const { todo } = req.body;
    const todoItem = {
        todo: todo,
        isCompleted: false,
      }; 
   const updatedTodo =  await Todo.create(todoItem);
     const allTodo = await Todo.find(); //Do not use this method. Do the array manipulation from Front End
      res.json(allTodo);
  } catch (error) {
  res.status(400).json({
    message:error.message,
  });
  }
});
  router.put("/", async(req,res) => {
  try {
    const {_id, todo, isCompleted} = req.body;
    const isExist = todoList.find(data=> data.id ===id);
  const fieldsToUpdate = {
      todo,
      isCompleted
  }
    const updatedData = await Todo.findByIdAndUpdate(_id, fieldsToUpdate, {new:true})
    if(updatedData) {
        
     const allTodo = await Todo.find(); //Do not use this method. Do the array manipulation from Front 
        return res.json(allTodo);
    }
    
    res.status(404).json({
        message: `Item with id:${id} does not exist`,
    });
  } catch (error) {
    
    res.status(404).json({
        message:error.message,
    });
  }
     
  });
  
  router.delete("/",async (req,res) => {
try {
    const {_id} = req.body;
const deletedField = await Todo.findByIdAndDelete(_id)
//   const todoIndex = todoList.findIndex((todoItem) => todoItem.id === id);
  if(deletedField) {
    
    const allTodo = await Todo.find(); //Do not use this method. Do the array manipulation from Front 
      return res.json(allTodo);
  };
  
  res.status(404).json({message: "Item does not exist"})
  
} catch (error) {
    res.status(404).json({message:error.message})
    
}  
});
  
  module.exports = router;