//jshint esversion:6
const express = require("express");
const userController = require("../controller/userController.js");
const categoryController = require("../controller/categoryController.js");
const adminController = require("../controller/adminController.js");
const userRouter = express.Router();


userRouter.post("/register", userController.userRegister);
userRouter.post("/login", userController.userLogin);
userRouter.get("/categories", categoryController.viewCategory);
userRouter.get("/products", adminController.viewProduct);










module.exports = userRouter;