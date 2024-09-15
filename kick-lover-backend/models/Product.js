const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Size Schema
const sizeSchema = new Schema(
  {
    size: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false } // No need for a unique _id for nested schema
);

// Define Product Schema
const productSchema = new Schema(
  {
    brand: {
      type: String,
      required: [true, "Please add a name"],
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please add an image URL"],
    },
    category: {
      type: String,
      enum: ["Men", "Women"],
      required: [true, "Please add a category"],
    },
    sizes: {
      type: [sizeSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to ensure sizes are valid based on category
productSchema.pre("save", function (next) {
  if (this.category === "Men") {
    const validSizes = Array.from({ length: 8 }, (_, i) => 40 + i);
    this.sizes.forEach((size) => {
      if (!validSizes.includes(size.size)) {
        return next(new Error("Invalid size for Men category"));
      }
    });
  } else if (this.category === "Women") {
    const validSizes = Array.from({ length: 8 }, (_, i) => 36 + i);
    this.sizes.forEach((size) => {
      if (!validSizes.includes(size.size)) {
        return next(new Error("Invalid size for Women category"));
      }
    });
  }
  next();
});

// Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
