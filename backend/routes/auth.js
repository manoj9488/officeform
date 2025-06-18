const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register - no validation, plain password
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.send("User registered");
  } catch {
    res.status(400).send("Registration failed");
  }
});

// Login - no password hashing or session management
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) return res.send("Login successful");
  res.status(401).send("Invalid credentials");
});

module.exports = router;
