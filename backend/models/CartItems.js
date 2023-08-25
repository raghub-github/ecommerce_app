const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  cartValues: {
    type: Object, required: false, default: {
      "name": "iphone x",
      "company": "apple",
      "price": 6000000,
      "colors": [
        "#ff0000",
        "#000000",
        "#CDD0D0"
      ],
      "image": "https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "description": "The mobile is compact with its 6.2-inch OLED screen and far lighter at 168g. It perfectly captures the design, looks, and feel of the expensive one. It comes with a snapdragon processor with a 5n chip in it. It has a 200mp camera in the rear 100mp in front perfect for selfie lovers. It also support HDR content means you can watch 4K content on it.",
      "category": "mobile",
      "featured": true,
      "rating": 4.3
    }
  },
  // title: { type: String, required: true },
  // description: { type: String, required: true },
  // tag: { type: String, default: "General" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("carts", CartSchema);
