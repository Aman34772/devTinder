const express = require("express");

const app = express();

app.use("/user", (req, res) => res.send("hahhahahahahaha"));


//this will only handle the GET call to /user
app.get("/user", (req, res) => res.send("Hey user"));


//this will match all the http method API calls to /test
// app.use("/", (req, res) => {
//     res.send("Namaste Akshay");
// });

app.post("/user",(req,res)=>{
    //saving to the database
    console.log("Hello jii save kr rha hu")
    res.send("Hello to the database")
});
app.delete("/user",(req,res)=>res.send("deleted successfully"))
app.use("/test", (req, res) => res.send("hello from the server"));

app.listen(7777, () => console.log("connected"));
