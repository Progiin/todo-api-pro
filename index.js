const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/tasks", (req, res) => res.json(tasks));

app.post("/tasks", (req, res) => {
  const task = {
    id: Date.now(),
    title: req.body.title,
    done: false
  };
  tasks.push(task);
  res.json(task);
});

app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) task.done = true;
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.send("deleted");
});

app.listen(3000, () => console.log("🔥 rodando"));
