const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    featured: { type: Boolean, required: false },
    rating: { type: Number, default: 4.3 },
    createdAt: { type: Date, default: Date.now(), },
    category: { type: String, required: true, },
    colors: { type: Array, required: false, },
    image: { type: Array, required: true },
    description: { type: String, required: false, },
    stock:{type: Number, required: true},
    reviews:{type:Number, required: true, default: 99},
    company: { type: String, enum: { values: ["apple", "samsung", "dell", "mi", "nokia", "asus", "lenova", "rolex"], message: `{VALUE} is not supported` }, }
});

module.exports = mongoose.model("Product", productSchema);