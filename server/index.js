const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const cors = require("cors");
require('dotenv').config();
const { todo } = require("node:test");
const connectDb = require("./config/db");
const todoRoute = require("./routes/todo");

app.use(cors());
app.use(express.json());
connectDb();
app.use("/api/todo", todoRoute);
app.all("*", (req, res) => {
  res.status(404).json("This page does not exist");
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(` server running on on http://localhost:${PORT}`));
