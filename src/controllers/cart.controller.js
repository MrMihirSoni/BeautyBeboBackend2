const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");

const addToCart = async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;
  const userName = req.body.userName;
  try {
    const product = await ProductModel.findOne({ _id: id });
    if (product) {
      const newProduct = new CartModel({ productId: id, userId });
      await newProduct.save();
      res.status(201).json({
        message: `Product with id ${id} is added to ${userName}'s cart!`,
      });
    } else throw new Error("invalid product ID!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const showCart = async (req, res) => {
  const userId = req.body.userId;
  try {
    const myCart = await CartModel.find({ userId });
    if (myCart.length > 0) {
      let myMainCart = await Promise.all(
        myCart.map(async (ele) => {
          const product = await ProductModel.findOne({ _id: ele.productId });
          return product;
        })
      );
      res.status(200).json({ cartData: myMainCart });
    } else throw new Error("Your cart is empty!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCart = async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;
  try {
    const productToDelete = await CartModel.findOne({ productId: id, userId });
    if (productToDelete) {
      const idToDelete = productToDelete._id;
      await CartModel.findByIdAndDelete(idToDelete);
      const deletedProduct = await ProductModel.findOne({ _id: id });
      res.status(200).json({
        message: "Item is removed from cart!",
        deletedProduct: deletedProduct,
      });
    } else
      throw new Error("Product not found! please pass a valid product id!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addToCart, showCart, deleteCart };
