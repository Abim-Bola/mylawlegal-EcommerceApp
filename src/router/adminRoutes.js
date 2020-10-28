//jshint esversion:6
const express = require("express");
const adminController = require("../controller/adminController.js");
const categoryController = require("../controller/categoryController.js");
const adminRouter = express.Router();

const {adminLogin} = adminController;
//admin routes
adminRouter.post("/register", adminController.adminRegister);
adminRouter.post("/login", adminLogin);
adminRouter.get("/products", adminController.adminViewProduct);
adminRouter.post("/addproduct", adminController.adminAddProduct);
adminRouter.delete("/removeproduct", adminController.adminRemoveProduct);
adminRouter.put("/editproduct", adminController.adminEditProduct);

//admin routes for categories
adminRouter.post("/add-category", categoryController.addCategory);
adminRouter.get("/view-category", categoryController.viewCategory);
adminRouter.delete("/delete-category/:categoryId", categoryController.deleteCategory);
adminRouter.patch("/update-category/:categoryId", categoryController.updateCategory);






module.exports = adminRouter;