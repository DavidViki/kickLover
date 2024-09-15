const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
} = require("../controllers/orderController");

// @desc Create a new order
// @route POST /api/orders
// @access Private
router.post("/", createOrder);

// @desc Get all orders for the logged-in user
// @route GET /api/orders/myorders
// @access Private
router.get("/myorders", protect, getMyOrders);

// @desc Get all orders (Admin only)
// @route GET /api/orders
// @access Private/Admin
router.get("/", protect, admin, getAllOrders);

// @desc Get a specific order by ID
// @route GET /api/orders/:id
// @access Private
router.get("/:id", protect, getOrderById);

// @desc Mark an order as confirmed (Admin only)
// @route PUT /api/orders/:id/confirm
// @access Private/Admin
router.put("/:id/confirm", protect, admin, confirmOrder);

// @desc Mark an order as shipped (Admin only)
// @route PUT /api/orders/:id/ship
// @access Private/Admin
router.put("/:id/ship", protect, admin, shipOrder);

// @desc Mark an order as delivered (Admin only)
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
router.put("/:id/deliver", protect, admin, deliverOrder);

// @desc Cancel an order (User or Admin)
// @route PUT /api/orders/:id/cancel
// @access Private (User or Admin)
router.put("/:id/cancel", protect, cancelOrder);

module.exports = router;
