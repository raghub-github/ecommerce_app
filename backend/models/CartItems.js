const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", },
  amount: { type: Number },
  color: { type: String },
  price: { type: Number },
  image: { type: String },
  max: { type: Number },
  name: { type: String },
  _pid: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("cart", CartSchema);
