const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const { getUsers } = require("../controllers/user.controller");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get users with pagination and filtering
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of users
 */

router.get(
  "/",
  protect,
  authorize("admin"),
  getUsers
);



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
