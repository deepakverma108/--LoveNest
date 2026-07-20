const express = require("express");
const { userAuth } = require("../middlewares/auth");
const chatRouter = express.Router();
const { chat } = require("../controller/chatController");

chatRouter.get("/chat/:targetUserId", userAuth, chat);
module.exports = chatRouter;
