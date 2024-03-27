const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    todo:String,
    isCompleted:Boolean
});