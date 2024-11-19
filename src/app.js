const express = require("express");
const { connectDb } = require("./config/Database");
const app = express();
const dotenv = require("dotenv");
const { User } = require("./models/user");
dotenv.config();

app.use(express.json());
app.post("/signup", async (req, res) => {
  //creating a new instances of the User model
  console.log(req);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("Error saving the user: " + error.message);
  }
});

//Feed API - Get /feed - get all the users from the database
app.get("/feed", async(req, res) => {
  const userEmail = req.body.emailId;

  try {
    // const users = await User.find({emailId: userEmail});
    const user =  await User.findOne({emailId : userEmail});
    // users.length ===0 
    if(!user){
      res.status(404).send("user not found")
    }else{
      // res.send(users);
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("something went wrong")
  }
  res.send(userData);
  console.log(userData);
});

app.get("/feeds",async(req,res)=>{
  const Users = await User.find({});
  try {
    res.send(Users);
  } catch (error) {
    res.status(400).send("something went wrong")
  }
})



connectDb(process.env.url)
  .then(() => {
    console.log("MongoDb connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server is listening at ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));

app.get("/test", (req, res) => {
  res.send("");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    // always keep it towards end
    //log your error
    res.status(500).send("something went wrong");
  }
});
