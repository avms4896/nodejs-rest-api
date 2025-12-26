const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

// Admin-only route
router.get(
  "/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Admin access granted",
      user: req.user
    });
  }
);

// Any authenticated user
router.get(
  "/profile",
  protect,
  (req, res) => {
    res.json({
      message: "User profile",
      user: req.user
    });
  }
);

module.exports = router;
