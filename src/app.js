const express = require("express");
const { connectDb } = require("./config/Database");
const app = express();
const dotenv = require("dotenv");
const {User} = require("./models/user");
dotenv.config();


app.use(express.json());
app.post("/signup", async (req, res) => {
  //creating a new instances of the User model
  console.log(req)
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("Error saving the user: "+ error.message)
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
