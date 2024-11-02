const express = require("express");

const app = express();

// if i'll have a lot more handler we'll do / we can send multiple handlers into an array
// app.use("/route", [rH,rH2],rH3, rH4, rH5);






// what will happen if i hit /user??  -- it will give response 1 it goes to the first route handler bcoz JS is a route handler what will happen if i didnot send any response in first route handler it will continue to the pending request no sencond response will come then how will i go for the second route handler i.e, next() after this you can see the second request handler
app.use("/user",(req,res,next)=>{
  //route handler
  // res.send("route handler response 1");
  console.log("handling users");
  //what if i do the next function before the response??🫢 i got the second response but recieves an error as well
  next();
},(req,res)=>{
  console.log("route handler 2")
  //if i do like this 2 reponses in 1 route then it will give error for the sencond response that's why because of response has already went through error is-- cannot set headers after they are sent to the client
  res.send("hitted the second route handler");
}
//if i put next in last route it will give error because it's finding the next handler
)

app.listen(7777, () => console.log("connected"));