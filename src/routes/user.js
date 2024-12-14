const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const userRouter = express.Router();
const { User } = require("../models/user");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

//Get all the pending connection requests for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequestModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
        //in case of if i don't want to send in array instead of has to send into the strings with a space
        // }).populate("fromUserId", ["firstName","lastName"])
      })
      .populate("fromUserId", USER_SAFE_DATA);

    // res.send(connectionRequests);
    res.json({
      message: "data fetched successfully",
      data: connectionRequests,
    });
  } catch (error) {
    req.statusCode(400).send("ERROR: " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequestModel
      .find({
        $or: [
          {
            toUserId: loggedInUser._id,
            status: "accepted",
          },
          {
            fromUserId: loggedInUser._id,
            status: "accepted",
          },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connectionRequests.map((row) => {
      if (row?.fromUserId?._id.toString() === loggedInUser?._id.toString()) {
        return row?.toUserId;
      } else {
        return row?.fromUserId;
      }
    });
    res.json({ data });
    //Akshay => Elon
    //Elon => Mark    // ELON can be either fromUser or toUserId
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

userRouter.get("/user/feed",userAuth, async (req, res) => {
  try {
    //User should see all the user cards except
    // 0. his own card
    // 1. his connections
    // 2. ignored people
    // 3. already sent the connection request

    // Example:Rahul = [ Akshay, Elon, Mark, Donald, MS Dhoni, Virat]
    // R -> Akshay -> rejected    R -> Elon-> Accepted
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    //Find all connectionRequests (sent + received)
    const connectionRequest = await connectionRequestModel
      .find({
        $or: [
          {
            fromUserId: loggedInUser._id,
          },
          {
            toUserId: loggedInUser._id,
          },
        ],
      })
      .select("fromUserId toUserId");
    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req?.fromUserId?.toString());
      hideUsersFromFeed.add(req?.toUserId?.toString());
    });
    // console.log(hideUsersFromFeed);
    // res.send(connectionRequest);

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
    res.send(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = userRouter;
