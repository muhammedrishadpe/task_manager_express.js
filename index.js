const express = require("express");
const app =express();

const PORT = 3005;

app.get("/api/todo", (req,res) => {
    res.json("Get Method");
});
app.all("*", (req,res) => {
    res.status(404).json("This page does not exist");
});


// app.post("/api/todo")
// app.put("/api/todo")
// app.delete("/api/todo")

app.listen(PORT , () => console.log(` server running on ${PORT}`))