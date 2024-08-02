const express = require("express")
const Router = express.Router()
const UserController = require('../Controllers/UserController')

Router.post("/newuser",UserController.newUser);
Router.post("/login",UserController.login);
Router.get("/getuser",UserController.getuser)
Router.get("/getuserbyid/:id",UserController.getuserbyid)


module.exports = Router;