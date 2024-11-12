const express = require("express");

const app = express();

//middleware comes first before any http method routes
app.use("/",(req,res)=>{
    // res.send("Handling the /route")
    next();
    //if i put next() here it ei;; gp through  the next handler
})


//Get /users => it will go through the chain of middlewares then it will handle the response 
app.get("/user",(req,res,next)=>{
    console.log("Handling /user route")
    next();
},
//route handlers are also called as a middleware because it comes in between
(req,res,next)=>{
    res.send("2nd Route Handler")
}
)



app.listen(7777, () => console.log("connected"));