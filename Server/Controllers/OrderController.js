const OrderModel = require('../Models/OrderModel');
const CartModel = require("../Models/CartModel");
const ProductModel = require('../Models/ProductModel');
const { v4 } = require('uuid');

//ADD-ORDER
const addorder = async (req, res) => {
    const user_id = req.user.id; 

    const { cust_name, cust_phone, cust_address } = req.body;
    try {
        const cart = await CartModel.findOne({ user_id }); 

        if (cart) {
            let subtotal = 0;
            await Promise.all(
                cart.products.map(async (item) => {
                    const product = await ProductModel.findOne({ id: item.product_id });
                    if (product) {
                        console.log(product);
                        subtotal += product.price * item.quantity;
                    }
                })
            );

            const order = new OrderModel({
                id: v4(),
                user_id,
                cust_name,
                cust_phone,
                cust_address,
                order_date : new Date(),
                delivery_date : new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), 
                total_amount: subtotal,
                order_status : "confirmed",
                order_items: cart.products
            });

            await order.save();
            await CartModel.deleteOne({ user_id });
            res.status(200).json({status:"success", message: "Order Placed" ,order});
        } else {
            res.status(404).json({ message: "No Products" });
        }
    } catch (err) {
        res.status(500).send({ error: err.message, message: "Can't place " });
    }
};

//GET-ORDER
const getorder = async (req, res) => {
    const user_id = req.user.id; 
    try {
        const orderDetails = await OrderModel.find({ user_id });
        const allProducts = [];

        for (const order of orderDetails) {
            for (const item of order.order_items) {
                const productDetails = await ProductModel.findOne({ id: item.product_id });
                if (productDetails) {
                    allProducts.push({
                        product_id: item.product_id,
                        quantity: item.quantity,
                        delivery_date: order.delivery_date, 
                        title: productDetails.title,
                        price: productDetails.price,
                        image: productDetails.image
                    });
                } else {
                    console.error("Product not found");
                }
            }
        }
        res.status(200).json({ orders: orderDetails, products: allProducts });
    } catch (err) {
        res.status(500).send({ error: err.message, message: "Can't retrieve orders" });
    }
};

module.exports = { addorder, getorder };
