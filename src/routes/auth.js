const express = require('express');
const {User} = require('../models/user');
const { validateSignupData } = require("../Utils/validation");
var bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/userSignup", async (req, res) => {
    try {
      //validation of data
      validateSignupData(req);
      //Encrypt the password and then store the user into the database
      const { firstName, lastName, emailId, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      // console.log(passwordHash);
      //creating a new instances of the User model
      // console.log(req);
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
      await user.save();
      res.send("User added successfully");
    } catch (error) {
      res.status(400).send("Error saving the user: " + error.message);
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      // console.log(emailId);
      // console.log(password);
      const user = await User.findOne({ emailId: emailId });
      // console.log(user);
      if (!user) {
        throw new Error("User doesn't exist");
      }
      const isPasswordValid = await user.validatePassword(password)
      if (isPasswordValid) {
        //Create a JWT Token
        const token = await user.getJWT()
        // console.log(token);
        //Add the token to cookie and send the response back to the user
        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
        });
        res.status(200).send("login successful!!");
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (error) {
      res.status(400).send("something went wrong " + error.message);
    }
  });

module.exports = router;