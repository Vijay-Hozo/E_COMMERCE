const UserModel = require("../Models/UserModel");
const bcrypt = require("bcryptjs")  //FOR HASHING PASSWORD
const jwt = require("jsonwebtoken")

//REGISTER
const newUser = async(req,res)=>{
    try{
    const {username,email,password} = req.body;
    const user = await UserModel.findOne({ email })
    if(user){
        return res.status(400).json({status:"failure",message:"username or email already exists"})
    }
    if(!user){
        const newUser = new UserModel({
            username,
            email,
            password
        })
        await newUser.save();
        res.status(200).json({status:"success", message:"account created successfully",newUser})
        }
    }
    catch(err){
        res.status(500).json({status:"failure",message:"cannot create new user"})
    }
}

//LOGIN
const login = async(req,res)=>{
    const {email,password} = req.body;
    const user =await UserModel.findOne({email})
    try{
        if(!user){
            return res.status(400).json({status:"failure",message:"user not found"})
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return res.status(400).json({status:"failure",message:"invalid password"})
        }
        const token = jwt.sign({id:user._id},"secret_key",{
            expiresIn:"8h"
        })
        res.status(200).json({status:"success",message:"loggined successfully",token})
    }
    catch(err){
        res.status(500).json({status:"failed", error:err.message});
    }
}

//GETALLUSER
const getuser = async(req,res)=>{
    try{
    const user = await UserModel.find()
    res.status(200).json({status:"success",message:"fetched",user})
    }
    catch(err){
        res.status(401).json({status:"failure",message:"error", message:err.message});
    }
}

//GETUSERBYID
const getuserbyid = async(req,res)=>{
    const id = req.params.id;
    if(!id){
        return res.status(400).json({status:"failure",message:"id is required"})
    }
    try{
        const user = await UserModel.findById(id);
        res.status(200).json({status:"success",message:"fetched",user})
    }
    catch(err){
        res.status(401).json({status:"failure",message:"error", message:err.message});
    }
}

module.exports = {newUser,login,getuser,getuserbyid}
