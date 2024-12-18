const express = require("express");
const { connectDb } = require("./config/Database");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
var cookieParser = require("cookie-parser");
const { User } = require("./models/user");

dotenv.config();
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
  // console.log(userData);
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
    // console.log(userId);

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
  // console.log(data);
  // console.log(userId);
  try {
    const Allowed_Updates = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      Allowed_Updates.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills >= 10) {
      throw new Error("You can add upto 10 skills only");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(200).send("updated successfully");
    // console.log(user);
  } catch (error) {
    res.status(400).send("update failed: " + error.message);
  }
});

//connecting and listening
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
