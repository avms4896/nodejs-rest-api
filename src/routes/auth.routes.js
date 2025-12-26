const express = require("express");
const router = express.Router();

// Register
router.post("/register", (req, res) => {
  res.json({
    message: "User registered (placeholder)"
  });
});

// Login
router.post("/login", (req, res) => {
  res.json({
    message: "User logged in (placeholder)"
  });
});

module.exports = router;
