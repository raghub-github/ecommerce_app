const express = require('express');
const router = express.Router();
const Product = require("../models/products"); 

// Define a route for adding a product
router.post('/addproducts', async (req, res) => {
    try {
        const productData = req.body;
        const products = new Product(productData);
        await products.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add the product' });
    }
});

module.exports = router;
