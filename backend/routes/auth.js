const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

//ROUTER 1: Create a user using POST "/api/auth/createuser", doesn't require authentication
router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("mobile", "enter a valid mobile number").isLength({ max: 10 }),
    body("address", "enter a valid address"),
    body("password", "Your password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],

  // If there are error-> return a bad request and the error
  async (req, res) => {
    let success = false;
    // console.log("user created", req, res);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ success, errors: (errors.array()) });
      return res.status(400).json({ success, error: errors.array()[0].msg });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: secPass,
        address: req.body.address,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      var authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken });
    } catch (error) {
      success = false;
      if (error.code === 11000) {
        // Duplicate key error
        // Check whether the user with email exists already
        return res.status(400).json({ success, error: "Email already exists" });
      }
      // console.error(error);
      res.status(500).json({ success, error: "Server error" });
    }
  }
);

//ROUTER 2: Authenticate a user using POST "/api/auth/login", no login required
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "Password cannot be empty").notEmpty(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      // return res.status(400).json({ success, errors: errors.array() });
      return res.status(400).json({ success, error: errors.array()[0].msg });
    };
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      var authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      // console.error(error.message);
      res.status(500).send({ success, error: "Internal server error" });
    }
  }
);

//ROUTER 3: Get loggedin user details using POST: "/api/auth/getuser", login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

router.put("/updateuser/:id", fetchuser, async (req, res) => {
  const { address } = req.body;
  try {
    // Create a new cart Object
    const newUser = {};
    if (address) {
      newUser.address = address;
    }
    // Find the user to be updated and update it 
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    // if (user._id.toString() !== req.user.id) {
    //   return res.status(401).json("User Not Allowed");
    // }
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
