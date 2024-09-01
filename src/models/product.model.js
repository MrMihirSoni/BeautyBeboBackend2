const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    image: {type: String, require: true},
    category: {type: String, require: true},
})
 
const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;