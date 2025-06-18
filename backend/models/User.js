const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  confirmPassword: String,
   // Intentionally stored in plain text for learning
});

module.exports = mongoose.model("User", userSchema);
