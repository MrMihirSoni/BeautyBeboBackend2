const {
  addToCart,
  showCart,
  deleteCart,
} = require("../controllers/cart.controller");

const cartRouter = require("express").Router();

cartRouter.post("/add/:id", addToCart);
cartRouter.get("/", showCart);
cartRouter.delete("/delete/:id", deleteCart);

module.exports = cartRouter;
