const CartModel = require("../Models/CartModel");
const ProductModel = require("../Models/ProductModel")

exports.deleteproduct = async (userid,product_id) => {
    const cart = CartModel.findOne({user_id:userid})
    const product = cart.products.filter((prod)=>prod.id!=product_id)
    const NewCartItems = new CartModel({
        user_id : userid,
        products : product
    })
    await NewCartItems.save();
}

const getproduct = async(user_id) => {
    const cart = await CartModel.findOne({user_id})
    // console.log("cart",user_id);
    
    if (cart) {
        let subtotal = 0;
        const productDetails = await Promise.all(
          cart.products.map(async (item) => {
            const product = await ProductModel.findOne({ id: item.product_id }, 'title description image price');
            subtotal += product.price * item.quantity;
            return {
              title: product.title,
              description: product.description,
              image:product.image,
              price:  product.price,
              quantity: item.quantity,
            };
          })
        );
        return { productDetails, subtotal };
    }
}

module.exports = {getproduct}

