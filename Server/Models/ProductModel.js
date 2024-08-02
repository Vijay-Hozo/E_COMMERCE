const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema
(
    {
            id: {
                type:String,
                unique:true
            },
            title:{
                type:String,
                required:[true,"Title is required"]
            },
            description:{
                type:String,
                required:true
            },
            category:{
                type:String
            },
            price:{
                type:Number,
                required:true
            },
            image:{
                type:String
            },
            rating:{
                rate:{
                    type:Number
                },
                count:{
                    type:Number
                }
            }
     }
)

const ProductModel = mongoose.model('Product',ProductSchema);
module.exports = ProductModel;