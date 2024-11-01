const express = require("express");

const app = express();
app.use("/", (req, res) => res.send("Namaste Akshay"));
app.use("/hello", (req, res) => res.send("hello hello hello"));
app.use("/test", (req, res) => res.send("hello from the server"));
app.get("/", (req, res) => res.send("Hey"));

app.listen(7777, () => console.log("connected"));
