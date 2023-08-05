const express = require("express");
const productController = require("../Controller/product.js");

let route = express.Router();

route.get("/get", productController.getProductDetails);

 route.post("/addproduct", productController.addproductDetails);

 route.get("/product/:id", productController.getproduct);

 route.put("/product/:id", productController.putupdateproduct);

 route.delete("/product/:id", productController.deleteproduct);

module.exports=route;