const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo: {
    type:String,
    minLength:5,
    maxLength:10,
    required:true
  }  ,
  isCompleted:{
    type:String,
    required:[true, "this field required by DB"], // just a demo
  }
});

module.exports = mongoose.model("Todo", todoSchema);