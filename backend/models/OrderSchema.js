const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderID: { type: String, required: true },
    products: [
        {
            productID: { type: String, required: true },
            productName: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            category: { type: String, required: true, },
            color: { type: String, required: false, },
            image: { type: String, required: true },
            description: { type: String, required: false, },
            company: { type: String, required: true }
        },
    ],
    user: {
        userID: { type: String, required: true },
        username: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required: true },
        address: { type: String, required: true },
    },
    // products: { type: mongoose.Schema.Types.Mixed, required: true },
    // user: { type: mongoose.Schema.Types.Mixed, required: true },
    paymentStatus: { type: Boolean, required: true },
    totalAmount: { type: Number, required: true },
    deliveryStatus: { type: Boolean, required: true, default: false },
    paymentDetails: { type: Object, required: true },
    orderDate: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("Order", orderSchema);