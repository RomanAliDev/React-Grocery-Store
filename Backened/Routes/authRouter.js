const express = require("express");
const authController = require("../Controller/authController");
const authRouter = express.Router();

authRouter.post("/signup", authController.SignupUser);
authRouter.post("/login", authController.loginUser);

module.exports = authRouter;
