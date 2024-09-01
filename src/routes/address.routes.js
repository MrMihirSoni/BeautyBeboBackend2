const {
  addAddress,
  showAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controller");

const addressRouter = require("express").Router();

addressRouter.post("/add", addAddress);
addressRouter.get("/", showAddress);
addressRouter.patch("/update/:id", updateAddress);
addressRouter.delete("/delete/:id", deleteAddress);

module.exports = addressRouter;
