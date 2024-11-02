const express = require("express");

const app = express();

//abc ,ac  here the optional thing either i can search this or that
app.get("/ab?c", (req, res) =>
  res.send({ firstName: "Akshay", lastName: "Saini" })
);
//abbbbbbc, abc  here it can be multiple b for + sign
app.get("/ab+c", (req, res) =>
  res.send({ firstName: "Akshay", lastName: "Saini" })
);
//abdskjhbejfgbc, abc could present anything in between a and c after b
app.get("/ab*c", (req, res) =>
  res.send({ firstName: "Akshay", lastName: "Saini" })
);

//here bc are optional
app.get("/a(bc)?d", (req, res) =>
  res.send({ firstName: "Akshay", lastName: "Saini" })
);
//And we can write regex as well over there instead of string if any of my path contains (a) it will work
app.get("/a/", (req, res) =>
  res.send({ firstName: "Akshay", lastName: "Saini" })
);

//if i write * in starting that means i can write anything in startingand then it ends with a fly
app.get(/.*fly$/, (req, res) => {
  res.send({ firstName: "Akshay", lastName: "Saini" });
});
//i can get query params by url by req.query
app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Akshay", lastName: "Saini" });
});

//dynamic routing
app.get("/user/:userId",(req,res)=>{
    console.log(req.params);
    res.send({firstName:"Akshay",lastName:"Saini"})
})


app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({firstName:"Akshay",lastName:"Saini"})
})

//these are the basic things we'll build on next some episodes

app.listen(7777, () => console.log("connected"));
