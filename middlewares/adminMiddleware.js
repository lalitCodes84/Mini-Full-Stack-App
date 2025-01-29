// Admin middleware to check if the user has an admin role
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next(); // Proceed to the next middleware or route handler
};

module.exports = adminMiddleware;
