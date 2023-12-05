const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const CartItems = require("../models/CartItems");
const Product = require("../models/products");
const { getAllProducts } = require("../controlles/products");
const { body, validationResult } = require("express-validator");

//Router : 1,  Get all the data using: GET method "allproducts"
router.route('/').get(getAllProducts);

router.post('/addsingleproduct', async (req, res) => {
  try {
    const productData = req.body;
    // Create a new product using the Mongoose model
    const product = new Product(productData);
    await product.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add the product' });
  }
});

//Router : 2,  Get all the carts using: GET method "api/carts/getuser" , login required
router.get("/fetchallcarts", fetchuser, async (req, res) => {
  try {
    const cartsData = await CartItems.find({ user: req.user.id });
    res.json(cartsData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Router: 2, add all the carts using: POST method "api/carts/addcarts" , login required
router.post(
  "/addcarts",
  fetchuser,
  // [
  //   body("data", "Not a valid object").isObject(),
  // ],
  async (req, res) => {
    try {
      const { color, amount, price, image, max, name, _pid, category, company } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const carts = new CartItems({
        color, amount, price, image, max, name, _pid, category, company,
        user: req.user.id,
      });
      const savedCart = await carts.save();
      res.json(savedCart);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

router.delete(
  "/deletecarts",
  fetchuser,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const cartsData = await CartItems.find({ user: req.user.id });
      cartsData.deleteMany();
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  });

// Router: 3, Update an existing cart using: PUT method "api/carts/updatecart" , login required
router.put("/updatecart/:id", fetchuser, async (req, res) => {
  const { newAmount } = req.body;
  try {
    // Create a new cart Object
    const newCart = {};
    if (newAmount) {
      newCart.amount = newAmount;
    }
    // Find the cart to be updated and update it 
    let cart = await CartItems.findById(req.params.id);
    if (!cart) {
      return res.status(404).json("Cart Not Found");
    }
    if (cart.user.toString() !== req.user.id) {
      return res.status(401).json("User Not Allowed");
    }
    cart = await CartItems.findByIdAndUpdate(
      req.params.id,
      { $set: newCart },
      { new: true }
    );
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal server error");
  }
});

//Router : 2,  Get all the carts using: DELETE method "api/carts/deleteallcarts" , login required
router.delete("/deleteallcarts", fetchuser, async (req, res) => {
  try {
    const cartsData = await CartItems.deleteMany({ user: req.user.id });
    res.json(cartsData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Router: 4, Delete an existing cart using: DELETE method "api/carts/deletecart" , login required
router.delete("/deletecart/:id", fetchuser, async (req, res) => {
  // Find the cart to be deleted and delete it
  try {
    let cart = await CartItems.findById(req.params.id);
    if (!cart) {
      return res.status(404).send("Not Found");
    }
    // Allow deletion only if user owns this carts
    if (cart.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    cart = await CartItems.findByIdAndDelete(req.params.id);
    res.json({ Success: "Cart has been deleted", cart: cart });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
