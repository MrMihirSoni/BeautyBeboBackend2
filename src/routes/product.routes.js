const {
  getAllProducts,
  addProduct,
  getSingleProduct,
} = require("../controllers/product.controller");
const auth = require("../middlewares/auth.middleware");

const productRouter = require("express").Router();

productRouter.get("/", getAllProducts);
productRouter.post("/add", auth, addProduct);
productRouter.get("/:id", getSingleProduct);

module.exports = productRouter;
