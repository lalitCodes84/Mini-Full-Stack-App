const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware"); // Middleware for authentication
const adminMiddleware = require("../middlewares/adminMiddleware"); // Middleware for admin role
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig"); // Import the Cloudinary config
// const upload = require('../middlewares/uploadMiddleware');

// Setup Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // Folder in your Cloudinary account
    allowed_formats: ["jpeg", "png", "jpg", "svg"], // Allowed file formats
  },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage });

// Product routes
// Create a new product (admin only), handling multiple images
router.post(
  "/products",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 5),
  productController.createProduct
);

// Get all products (public access)
router.get("/products", productController.getAllProducts);

// Get a product by ID (public access)
router.get("/products/:id", productController.getProductById);

// Update a product (admin only)
router.put(
  "/products/:id",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct
);

// Delete a product (admin only)
router.delete(
  "/products/:id",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct
);

module.exports = router;
