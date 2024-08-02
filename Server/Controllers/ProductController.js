const { request } = require('express');
const ProductModel = require('../Models/ProductModel')
const { v4: uuidv4 } = require('uuid');

//ADDPRODUCT
const addproduct = async(req,res)=>{
    try{
    const {id,title,description,category,price,image,rating} = req.body;
    const product = new ProductModel({
        id:uuidv4(),
        title,
        description,
        category,
        price,
        image,
        rating
    })
        await product.save();
        res.status(200).json({ status: "success", message: "Task created successfully" });

    } catch (error) {
        res.status(500).json({ status: "failed", message: "Cannot create task", error: error.message });
    }
} 

//GETPRODUCTS
const getproducts = async (req,res)=>{
    try
    {
        const products = await ProductModel.find();
        res.json({status:"success",message:"products fetched",products})
    }
    catch(err)
    {
        res.json({status:"failure", message:"error occured"})
        console.log("error occured");
    }
}

//UPDATEPRODUCTS
const updateproduct = async (req,res) => {
    const Id = req.params.id;
    try{
       const prod = await ProductModel.findById(Id);
       if(prod){
        await prod.updateOne(
            {
                "title":req.body.title,
                "description":req.body.description,
                "category":req.body.category,
                "price":req.body.price,
                "image":req.body.image,
                "rating":req.body.rating
            })
       }
        res.status(200).json({ status: "success", message: "Task Updated successfully" });
    } catch (error) {
        res.status(500).json({ status: "failed", message: "Cannot update task", error: error.message });
    }
}


//DELETEPRODUCTS
const deleteproduct = async(req,res) => {
    const Id = req.params.id;
    try{
     await ProductModel.findByIdAndDelete(Id);
    res.status(200).json({ status : "success", message : "Task deleted successfully"});
    
    }
    catch(err){
        res.status(500).json({ status: "failure", message:"cannot delete task", error:err.message})
    }
}

module.exports = {addproduct,getproducts,updateproduct,deleteproduct};