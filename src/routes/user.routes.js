const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { createUserValidation } = require("../validators/user.validator");

router.post(
  "/",
  protect,
  createUserValidation,
  validate,
  (req, res) => {
    res.json({
      message: "User created (validated)",
      data: req.body
    });
  }
);

module.exports = router;
