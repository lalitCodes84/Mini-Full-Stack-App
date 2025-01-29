const productModel = require("../models/product.model");
const mongoose = require("mongoose");
// const path = require('path');

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const createdBy = req.user.id; // Assuming authentication middleware sets `req.user.id`

  try {
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    // Map over req.files to extract paths and mimetypes
    const images = await req.files.map((file) => ({
      path: file.path, // File path or URL (e.g., Cloudinary URL)
      mimetype: file.mimetype, // MIME type of the file
    }));

    // Create the new product
    const newProduct = await productModel.create({
      name,
      description,
      price: parseFloat(price), // Ensure price is a number
      category,
      stock: parseInt(stock, 10), // Ensure stock is an integer
      images, // Assign images array
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
    newProduct.save();
  } catch (error) {
    console.error("Error saving product:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    // Safely map product fields
    const formattedProducts = products.map((product) => ({
      name: product.name || "Unknown",
      price: product.price?.toString() || "0", // Convert to string safely
      category: product.category || "No category",
      stock: product.stock || 0,
      images:
        product.images?.map((image) => ({
          path: image.path || "No path",
          mimetype: image.mimetype || "Unknown",
        })) || [],
      createdBy: product.createdBy || "Anonymous",
    }));

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: formattedProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  // Validate the product ID
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Product ID",
    });
  }

  try {
    const product = await productModel
      .findById(id)
      .populate("createdBy", "name email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updates
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};
