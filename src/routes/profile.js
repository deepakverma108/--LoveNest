const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { isLocale } = require("validator");

const {
  profileView,
  profileEdit,
  changePass,
} = require("../controller/profileController");

profileRouter.get("/profile/view", userAuth, profileView);
profileRouter.patch("/profile/edit", userAuth, profileEdit);
profileRouter.patch("/profile/password", userAuth, changePass);

module.exports = profileRouter;
