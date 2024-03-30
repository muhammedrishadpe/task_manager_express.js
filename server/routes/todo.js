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
     await Todo.create(req.body);
      res.json({message:"data has been added"});
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
        
        return res.json(updatedData);
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
      return res.json({
        message:"Record has been deleted",
      });
  };
  
  res.status(404).json({message: "Item does not exist"})
  
} catch (error) {
    res.status(404).json({message:error.message})
    
}  
});
  
  module.exports = router;