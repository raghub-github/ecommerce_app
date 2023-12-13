const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  // address: {
  //   name: { type: String, required: true },
  //   phone: { type: Number, required: true },
  //   alterPhone: { type: Number, required: false },
  //   vill_houseNo_flat_buildingName: { type: String, required: true },
  //   state: { type: String, required: true },
  //   district: { type: String, required: true },
  //   city: { type: String, required: true },
  //   pin: { type: Number, required: true },
  //   landmark: { type: String, required: false },
  // },
  address: {
    type: Object, required: false,
  },
}); 

const user = mongoose.model("user", UserSchema);
module.exports = user;
