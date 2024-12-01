const express = require("express");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();

router.post("/sendConnectionRequest", userAuth, (req, res, next) => {
  //sending the connection request
  const user = req.user;
  console.log("sending the connection request");
  res.send(user.firstName + " sent the connection request!");
});

module.exports = router;
