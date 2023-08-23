const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const CartItems = require("../models/CartItems");
const { body, validationResult } = require("express-validator");
// const user = require("../models/User");

//Router : 1,  Get all the carts using: GET method "api/carts/getuser" , login required
router.get("/fetchallcarts", fetchuser, async (req, res) => {
  try {
    const cartsData = await CartItems.find({ user: req.user.id });
    console.log(req.user.id, CartItems);
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
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const carts = new CartItems({
        title,
        description,
        tag,
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

//Router: 3, Update an existing cart using: PUT method "api/carts/updatecart" , login required
router.put("/updatecart/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = await req.body;
  try {
    // Create a anew cart Object
    const newCart = {};
    if (title) {
      newCart.title = title;
    }
    if (description) {
      newCart.description = description;
    }
    if (tag) {
      newCart.tag = tag;
    }
    // Find the cart to be updated and update it 
    let cart = await CartItems.findById(req.params.id);
    if (!cart) {
      return res.status(404).send("Not Found");
    }
    if (cart.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    cart = await CartItems.findByIdAndUpdate(
      req.params.id,
      { $set: newCart },
      { new: true }
    );
    res.json(cart);
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
    console.log(cart);
    console.log(cart.id);
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
