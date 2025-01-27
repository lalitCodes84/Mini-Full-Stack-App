const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Full name of the user
  email: { type: String, required: true, unique: true }, // Email (unique for each user)
  password: { type: String, required: true }, // Hashed password
  role: { type: String, enum: ["admin", "user"], default: "user" }, // User roles for access control
  createdAt: { type: Date, default: Date.now }, // Account creation timestamp
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
