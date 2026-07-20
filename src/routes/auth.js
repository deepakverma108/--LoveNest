const express = require("express");
const authRouter = express.Router();
const upload = require("../middlewares/multer");
const { signUp } = require("../controller/authController");
const { login } = require("../controller/authController");
const { logout } = require("../controller/authController");

authRouter.post("/signup", upload.single("photo"), signUp);
authRouter.post("/login",login);
authRouter.get("/logout", logout);
module.exports = authRouter;
