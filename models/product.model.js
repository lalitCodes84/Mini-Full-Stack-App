const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  images: [
    {
      path: { type: String, required: true }, // Image URL or path
      mimetype: { type: String, required: true }, // MIME type (e.g., 'image/jpeg')
    },
  ], // Store URLs of images
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
