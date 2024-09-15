const mongoose = require("mongoose");

// Schema for individual items in the order
const orderItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: Number, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

// Schema for the order
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [orderItemSchema], // Array of items in the order
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
      required: true,
    },
    confirmedAt: { type: Date },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
    cancelledAt: { type: Date },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Pre-save middleware to automatically update status dates
orderSchema.pre("save", function (next) {
  if (this.isModified("orderStatus")) {
    switch (this.orderStatus) {
      case "Confirmed":
        this.confirmedAt = new Date();
        break;
      case "Shipped":
        this.shippedAt = new Date();
        break;
      case "Delivered":
        this.deliveredAt = new Date();
        break;
      case "Cancelled":
        this.cancelledAt = new Date();
        break;
      default:
        break;
    }
  }
  next();
});

// Export the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
