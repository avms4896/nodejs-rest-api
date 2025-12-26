const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const {
  registerValidation,
  loginValidation
} = require("../validators/auth.validator");

// Register
router.post(
  "/register",
  registerValidation,
  validate,
  register
);

// Login
router.post(
  "/login",
  loginValidation,
  validate,
  login
);

module.exports = router;
