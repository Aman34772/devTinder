const express = require("express");
const { connectDb } = require("./config/Database");
const app = express();
const dotenv = require("dotenv");
var bcrypt = require('bcryptjs');
const { User } = require("./models/user");
const {validateSignupData} =require("./Utils/validation")
dotenv.config();

app.use(express.json());
app.post("/userSignup", async (req, res) => {
  try {
  //validation of data
  validateSignupData(req)


  //Encrypt the password and then store the user into the database
  const {firstName, lastName, emailId, password} = req.body;
    const passwordHash = await bcrypt.hash(password, 10)
    console.log(passwordHash);


  //creating a new instances of the User model
  // console.log(req);
  const user = new User({
    firstName,lastName,emailId,password : passwordHash
  });
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("Error saving the user: " + error.message);
  }
});


app.post("/login",async(req,res)=>{
  try {
    const {emailId, password}= req.body;
    console.log(emailId);
    console.log(password);
    const user =await User.findOne({emailId : emailId});
    console.log(user);
    if(!user){
      throw new Error("User doesm't exist")
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(isPasswordValid){
      res.status(200).send("login successful!!");
    }else{
      throw new Error("Invalid Credentials")
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
})

//Feed API - Get /feed - get all the users from the database
app.get("/getOneUser", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    // const users = await User.find({emailId: userEmail});
    const user = await User.findOne({ emailId: userEmail });
    // users.length ===0
    if (!user) {
      res.status(404).send("user not found");
    } else {
      // res.send(users);
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
  res.send(userData);
  console.log(userData);
});

app.get("/getAllUsers", async (req, res) => {
  const Users = await User.find({});
  try {
    res.send(Users);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

//delete a user from the database
app.delete("/deletedUser", async (req, res) => {
  const userId = req.body.userId;
  try {
    console.log(userId);

    // const user = await User.findByIdAndDelete({_id : userId });
    const user = await User.findByIdAndDelete(userId);
    res.status(200).send("user deleted successfully");
  } catch (error) {
    res.status(400).send("User not found");
  }
});

//update data of the user
app.patch("/user/:userId", async (req, res, next) => {
  const data = req.body;
  const userId = req.params?.userId;
  console.log(data);
  console.log(userId);
  try {
    const Allowed_Updates = [
      "userId","photoUrl","about","gender","age","skills"
    ]
    
    const isUpdateAllowed = Object.keys(data).every(k=>Allowed_Updates.includes(k))
    if(!isUpdateAllowed){
      throw new Error("update not allowed")
    }
    if(data?.skills >=10){
      throw new Error("You can add upto 10 skills only");
    }
      const user = await User.findByIdAndUpdate({ _id: userId }, data, {
        returnDocument: "after",
        runValidators: true,
      });
      res.status(200).send("updated successfully");
      console.log(user);
  } catch (error) {
    res.status(400).send("update failed: " + error.message);
  }
});

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
