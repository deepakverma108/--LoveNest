const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { feed, followReq, connections } = require("../controller/userController");

userRouter.get("/user/feed", userAuth, feed);
userRouter.get("/user/request", userAuth, followReq);
userRouter.get("/user/connections", userAuth, connections);

module.exports = userRouter;
