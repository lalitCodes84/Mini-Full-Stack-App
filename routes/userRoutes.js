const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
// Routes
router.post("/register", userController.createUser); // Public route
router.post("/login", userController.loginUser); // Public route
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers); // Admin-only route
router.get("/:id", authMiddleware, userController.getUserById); // Authenticated users
router.put("/:id", authMiddleware, userController.updateUser); // Authenticated users
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser
); // Admin-only route

module.exports = router;
