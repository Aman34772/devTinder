const express = require("express");

const app = express();

// if i dont want to send multiple handler we can send from same route and other handler 
app.get("/user",(req,res,next)=>{
    console.log("Handling the route user!!");
    next()
},
// i can define my route handler one by one here and can send response same route with other handler 
//sequence of functions matter a lot
("/user",(req,res)=>{
    res.send("2nd route handler");
})
)


app.get("/user",(req,res,next)=>{
    console.log("first handler ")
    res.send("dekh lo");
    next();
},
("/user",(req,res)=>{
    res.send("second handler")
})
)




app.listen(7777, () => console.log("connected"));