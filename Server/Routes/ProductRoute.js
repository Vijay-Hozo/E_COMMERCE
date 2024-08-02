const express = require("express");
const Router = express.Router();
const ProductController = require("../Controllers/ProductController");
const auth = require("../Middleware/Auth")


Router.get('/getproduct',auth,ProductController.getproducts);
Router.post('/addproduct',ProductController.addproduct);
Router.patch('/updateproduct/:id',ProductController.updateproduct);
Router.delete('/deleteproduct/:id',ProductController.deleteproduct);

module.exports = Router;