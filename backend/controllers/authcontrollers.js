
const User = require("../models/User");

// Register a new user (vulnerable - no validation, no hashing)
exports.registerUser = async (req, res) => {
  const { username, email, password,  confirmPassword} = req.body;
  try {
    const user = new User({ username, email, password,  confirmPassword });
    await user.save();
    res.status(201).send("User registered");
  } catch (err) {
    res.status(400).send("Registration failed");
  }
};

// Login (vulnerable - no hashing, no session/cookie)
exports.loginUser = async (req, res) => {
  const { username, password,  confirmPassword} = req.body;
  const user = await User.findOne({ username, password,  confirmPassword});
  if (user) return res.send("Login successful");
  res.status(401).send("Invalid credentials");
};