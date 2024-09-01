const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  userName: {type: String, require: true },
  email: { type: String, require: true },
  phone: { type: Number, require: true },
  password: { type: String, require: true },
});
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
