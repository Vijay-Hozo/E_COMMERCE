const CartModel = require("../Models/CartModel");
const ProductModel = require("../Models/ProductModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// ADD-TO-CART
const addtocart = async (req, res) => {
  const { productid, quantity } = req.body;
  const userid = req.user.id;

  if (!productid || !userid || quantity == null) {
    return res.status(401).send({ message: "Cannot add item, missing data." });
  }

  try {
    const cart = await CartModel.findOne({ userid });

    if (cart) {
      const oldProduct = cart.products.find((p) => p.product_id === productid);
      if (oldProduct) {
        oldProduct.quantity += quantity;
        await cart.save();
        return res.status(200).send({ message: "Item quantity updated.", oldProduct });
      } else {
        cart.products.push({ productid, quantity });
        await cart.save();
        return res.status(200).send({ message: "Item added to cart." });
      }
    } else {
      const newCart = new CartModel({ userid, products: [{ productid, quantity }] });
      await newCart.save();
      return res.status(200).send({ message: "New cart created." });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send({ error: "An error occurred." });
  }
};

// GET-ITEMS
const getcarts = async (req, res) => {
  const userid = req.user.id;

  try {
    const cart = await CartModel.findOne({ userid });

    if (cart) {
      let subtotal = 0;
      const productDetails = await Promise.all(
        cart.products.map(async (item) => {
          const product = await ProductModel.findOne({ id: item.productid });
          subtotal += product.price * item.quantity;
          return {
            title: product.title,
            description: product.description,
            image: product.image,
            price: product.price,
            quantity: item.quantity,
          };
        })
      );
      res.status(200).send({ productDetails, subtotal });
    } else {
      res.status(200).send({ message: "No items found", productDetails: [] });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

// REMOVE QUANTITY
const removequantity = async (req, res) => {
  const userid = req.user.id;
  const { productid, quantity } = req.body;

  if (!productid || !userid || quantity == null) {
    return res.status(401).send({ message: "Cannot remove quantity, missing data." });
  }

  try {
    const cart = await CartModel.findOne({ userid });

    if (cart) {
      const productIndex = cart.products.findIndex((p) => p.productid === productid);

      if (productIndex !== -1) {
        cart.products[productIndex].quantity -= quantity;

        if (cart.products[productIndex].quantity <= 0) {
          cart.products.splice(productIndex, 1);
        }

        if (cart.products.length > 0) {
          await cart.save();
          res.status(200).send({ message: "Quantity reduced." });
        } else {
          await CartModel.deleteOne({ userid });
          res.status(200).send({ message: "Cart emptied." });
        }
      } else {
        res.status(401).send({ message: "Product not found." });
      }
    } else {
      res.status(401).send({ message: "Cart not found." });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = {
  addtocart,
  getcarts,
  removequantity,
};
