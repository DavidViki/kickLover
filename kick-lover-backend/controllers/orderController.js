const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Product = require("../models/Product");

//Helper function to restore stock on order cancellation
const restoreStock = async (order) => {
  for (const item of order.orderItems) {
    const product = await Product.findById(item.product);
    const sizeIndex = product.sizes.findIndex(
      (size) => size.size === item.size
    );
    product.sizes[sizeIndex].quantity += item.quantity;
    await product.save();
  }
};

// @desc Create new order
// @route POST /api/orders
// @access Private (User)
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  // Check if there are any order items
  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ success: false, message: "No order items" });
  }

  // Create order
  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    orderStatus: "Pending",
  });

  // Update stock for each item
  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Deduct quantity from the respective size in stock
    const sizeIndex = product.sizes.findIndex(
      (size) => size.size === item.size
    );
    if (sizeIndex === 1 || product.sizes[sizeIndex].quantity < item.quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Not enough stock" });
    }

    product.sizes[sizeIndex].quantity -= item.quantity;
    await product.save();
  }

  const createdOrder = await order.save();
  res.status(201).json({
    success: true,
    order: createdOrder,
    message: "Order placed successfully",
  });
});

// @desc Get logged-in user's orders
// @route GET /api/orders/myorders
// @access Private (User)
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json({
    success: true,
    message: "Orders retrieved successfully",
    orders,
  });
});

// @desc Get all orders (Admin)
// @route GET /api/orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id username email");
  res.json({
    success: true,
    message: "All orders retrieved successfully",
    orders,
  });
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private (User or Admin)
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "id username email"
  );

  if (order) {
    // Ensure the logged-in user can only view their own orders unless they're an admin
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
    res.json({ success: true, message: "Order retrieved succesfully", order });
  } else {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
});

// @desc Update order status to Confirmed
// @route PUT /api/orders/:id/confirm
// @access Private/Admin
const confirmOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  // Check if the order is already confirmed
  if (order.orderStatus === "Confirmed") {
    return res
      .status(400)
      .json({ success: false, message: "Order is already confirmed" });
  }

  order.orderStatus = "Confirmed";
  const updatedOrder = await order.save();

  res.json({
    success: true,
    message: "Order confirmed successfully",
    order: updatedOrder,
  });
});

// @desc Update order to Shipped
// @route PUT /api/orders/:id/ship
// @access Private/Admin
const shipOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  // Check if the order is already shipped
  if (order.orderStatus === "Shipped") {
    return res
      .status(400)
      .json({ success: false, message: "Order is already shipped" });
  }

  order.orderStatus = "Shipped";
  const updatedOrder = await order.save();

  res.json({
    success: true,
    message: "Order shipped successfully",
    order: updatedOrder,
  });
});

// @desc Update order status to Delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const deliverOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  // Check if the order is already delivered
  if (order.orderStatus === "Delivered") {
    return res
      .status(400)
      .json({ success: false, message: "Order is already delivered" });
  }

  order.orderStatus = "Delivered";
  const updatedOrder = await order.save();

  res.json({
    success: true,
    message: "Order delivered successfully",
    order: updatedOrder,
  });
});

// @desc Cancel an order (User or Admin)
// @route PUT /api/orders/:id/cancel
// @access Private (User or Admin)
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  // Check if the logged-in user is either the one who placed the order or an admin
  if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized to cancel this order" });
  }

  if (order.orderStatus === "Cancelled") {
    return res
      .status(400)
      .json({ success: false, message: "Order is already cancelled" });
  }

  order.orderStatus = "Cancelled";

  // Restore stock when the order is cancelled
  await restoreStock(order);

  const updatedOrder = await order.save();
  res.json({
    success: true,
    message: "Order has been cancelled",
    order: updatedOrder,
  });
});

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
};
