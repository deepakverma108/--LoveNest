const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
// const requestLimiter = require("../middlewares/rateLimit");
const { sendReq, reqStatus } = require("../controller/requestController");

// requestRouter.use(requestLimiter);
requestRouter.post("/request/send/:status/:toUserId", userAuth, sendReq);
requestRouter.post("/request/review/:status/:requestedId", userAuth, reqStatus);
module.exports = requestRouter;
