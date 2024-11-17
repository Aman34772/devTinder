const express = require("express");

const app = express();


app.get("/getUserData",(req,res)=>{
    // try {
    //     //Logic of Db call and get user data
    //     res.send("User Data Sent")
    // } catch (error) {
    //     res.status(500).send("some error occured contact support team")
    // }
    throw new ERROR("dfghjf");
    res.send("User Data Sent")
})

app.use("/",(err,req,res,next)=>{
    if(err){
        // always keep it towards end
        //log your error
        res.status(500).send("something went wrong")
    }
})


app.listen(7777, () => console.log("connected"));