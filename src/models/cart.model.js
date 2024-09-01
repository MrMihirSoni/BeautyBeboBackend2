const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    productId: {type: String, require: true},
    userId: {type: String, required: true},
})
 
const CartModel = mongoose.model("cart", cartSchema);
module.exports = CartModel;