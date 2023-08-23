const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  // address: { type: String, required: false },
  // cartItems: { type: String, required: false }
});

const user = mongoose.model("user", UserSchema);
module.exports = user;
