const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema (
    {
        id:{
            type:String,
            required:true
        },
        cust_name:{
            type:String,
            required:true
        },
        cust_phone:{
            type:String,
            required:true
        },
        cust_address:{
            type:String,
            required:true
        },
        order_date:{
            type:Date,
            required:true
        },
        delivery_date:{
            type:Date,
            required:true   
        },
        order_items:{
            type:Array,
            ref:"Products",
            required:true
        },
        total_amount:{
            type:Number
        },
        order_status:{
            type:String,
            required:true
        },
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
    }
)

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;