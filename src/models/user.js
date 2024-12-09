const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config()
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      index:true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("please put strong password" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
    gender: {
      type: String,
      enum:{
        values:["male","female","other"],
        message:`{VALUE} is not a valid gender type`
      }
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL address: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default description of User",
    },
    skills: {
      type: Array,
    },
  },
  { timestamps: true }
);

// userSchema.index({firstName:1, lastName:1});
// userSchema.index({gender:1});

userSchema.methods.getJWT =async function(){
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.secretkey, {
    expiresIn: "1h",
  });
  return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
}
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
