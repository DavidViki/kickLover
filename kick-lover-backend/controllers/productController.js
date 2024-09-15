const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

// @desc Add a new product
// @route POST /api/products
// @access Private/Admin
const addProduct = asyncHandler(async (req, res) => {
  const { brand, name, description, price, imageUrl, category, sizes } =
    req.body;

  // Check if all required fields are provided
  if (
    !brand ||
    !name ||
    !description ||
    !price ||
    !imageUrl ||
    !category ||
    !sizes
  ) {
    res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
    return;
  }

  // Create a new product
  const product = await Product.create({
    brand,
    name,
    description,
    price,
    imageUrl,
    category,
    sizes,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// @desc Update an existing product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { brand, name, description, price, imageUrl, category, sizes } =
    req.body;

  //Find the product
  const product = await Product.findById(id);

  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }

  // Update the product details
  product.brand = brand || product.brand;
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.imageUrl = imageUrl || product.imageUrl;
  product.category = category || product.category;
  product.sizes = sizes || product.sizes;

  await product.save();

  res.json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

// @desc Restock an existing product
// @route PATCH /api/products/:id/restock
// @access Private/Admin
const restockProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { sizes } = req.body;

  // Find the product
  const product = await Product.findById(id);

  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }

  // Update sizes quantities
  sizes.forEach((size) => {
    const existingSize = product.sizes.find((s) => s.size === size.size);
    if (existingSize) {
      existingSize.quantity += size.quantity;
    } else {
      product.sizes.push(size);
    }
  });

  await product.save();

  res.json({
    success: true,
    message: "Product restocked successfully",
    product,
  });
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find and delete the product
  const product = await Product.findById(id);

  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }

  await product.remove();

  res.json({
    success: true,
    message: "Product deleted successfully",
  });
});

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({});

  res.json({
    success: true,
    products,
  });
});

// @desc Get products by category
// @route GET /api/products/category/:category
// @access Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category });

  if (!products.length) {
    res
      .status(404)
      .json({ success: false, message: "No products found for this category" });
    return;
  }

  res.json({
    success: true,
    products,
  });
});

// @desc Get products by brand
// @route GET /api/products/brand/:brand
// @access Public
const getProductsByBrand = asyncHandler(async (req, res) => {
  const { brand } = req.params;
  const products = await Product.find({ brand });

  if (!products.length) {
    res
      .status(404)
      .json({ success: false, message: "No products found for this brand" });
    return;
  }

  res.json({
    succes: true,
    products,
  });
});

// @desc Get product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }

  res.json({
    success: true,
    product,
  });
});

module.exports = {
  addProduct,
  updateProduct,
  restockProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsByBrand,
  getProductById,
};
