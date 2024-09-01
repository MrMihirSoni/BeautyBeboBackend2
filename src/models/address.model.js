const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  street: { type: String, required: true },
});

const AddressModel = mongoose.model("address", addressSchema);

module.exports = AddressModel;
