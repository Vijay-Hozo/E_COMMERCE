const express = require("express");
const Router = express.Router();
const CartController = require("../Controllers/CartController");
const auth = require("../Middleware/Auth");

Router.post("/addtocart",auth,CartController.addtocart);
Router.get("/getcart",auth,CartController.getcarts);
Router.delete("/deletequantity",auth,CartController.removequantity);


module.exports = Router;