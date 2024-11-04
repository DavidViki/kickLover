const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderToDelivered,
  deleteOrder,
  getUserOrders,
  cancelOrder,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @desc Create a new order
// @route POST /api/orders
// @access Private
router.post("/", protect, createOrder);

// @desc Get all orders (Admin)
// @route GET /api/orders
// @access Private (Admin only)
router.get("/", protect, admin, getOrders);

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private (Admin only)
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

// @desc Get user's orders
// @route GET /api/orders/my-orders
// @access Private (User must be logged in)
router.get("/my-orders", protect, getUserOrders);

// @desc Cancel an order
// @route PUT /api/orders/:id/cancel
// @access Private (User only if order status is Pending or Confirmed)
router.put("/:id/cancel", protect, cancelOrder);

// @desc Delete an order
// @route DELETE /api/orders/:id
// @access Private (Admin only)
router.delete("/:id", protect, admin, deleteOrder);

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
router.get("/:id", protect, getOrderById);

module.exports = router;
