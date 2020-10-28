//jshint esversion:6
const express = require("express");
const userController = require("../controller/userController.js");
const userRouter = express.Router();


userRouter.post("/register", userController.userRegister);
userRouter.post("/login", userController.userLogin);










module.exports = userRouter;