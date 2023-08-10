const express = require("express");
const productController = require("../Controller/product.js");
const usersController = require("../Controller/user.js");
const { Verifyauth } = require("../MiddleWare/Verifyauth.js");

let route = express.Router();

route.get("/get", Verifyauth,productController.getProductDetails);

route.post("/addproduct", Verifyauth, productController.addproductDetails);

route.get("/product/:id", Verifyauth, productController.getproduct);

route.put("/product/:id", Verifyauth, productController.putupdateproduct);

route.delete("/product/:id", Verifyauth, productController.deleteproduct);

//**************************************
route.post("/login", usersController.loginDetails);

route.post("/signup", usersController.signupDetails);

route.post("/otpVerify", usersController.otpVerify);

module.exports = route;