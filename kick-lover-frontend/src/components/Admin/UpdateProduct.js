import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import AdminProductContext from "../../context/AdminProductContext";
import Modal from "../Modal";

const UpdateProduct = () => {
  const { products, updateProduct, fetchProducts, loading } =
    useContext(AdminProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "success" or "error"
  const [modalMessage, setModalMessage] = useState("");

  const [formData, setFormData] = useState({
    brand: "",
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    sizes: {},
  });

  // Handle product selection
  const handleProductSelect = (e) => {
    const productId = e.target.value;
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      sizes: product.sizes || {},
    });
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle size changes
  const handleSizeChange = (size, quantity) => {
    setFormData({
      ...formData,
      sizes: {
        ...formData.sizes,
        [size]: quantity,
      },
    });
  };

  // Submit the updated product data
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...selectedProduct,
        ...formData,
      };
      await updateProduct(updatedProduct);

      fetchProducts();

      // Show success modal
      setModalType("success");
      setModalMessage("Product updated successfully!");
      setIsModalOpen(true);

      // Reset form and selected product after successful update
      setSelectedProduct(null);
      setFormData({
        brand: "",
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "",
        sizes: {},
      });
    } catch (error) {
      // Show error modal
      setModalType("error");
      setModalMessage(
        error ||
          error.response.message ||
          "There was an error updating the product."
      );
      setIsModalOpen(true);
    }
  };

  // Display loading spinner if data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 h-screen">
        <div
          className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-blue-600"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Update Product
      </h2>

      {/* Select Product Dropdown */}
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Select Product
        </label>
        <select
          className="w-full p-3 border bg-white border-gray-300 dark:bg-gray-700 dark:text-white rounded-lg"
          onChange={handleProductSelect}
          value={selectedProduct ? selectedProduct._id : ""}
        >
          <option key="a" value="">
            Select a product to update
          </option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* Form Fields - displayed after product selection */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Name */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
          </div>

          {/* Price */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
            />
          </div>

          {/* Image URL */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>

          {/* Sizes */}
          {formData.category && (
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Sizes & Quantities
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(formData.category === "men"
                  ? [40, 41, 42, 43, 44, 45, 46, 47]
                  : [36, 37, 38, 39, 40, 41, 42, 43]
                ).map((size) => (
                  <div key={size} className="flex items-center">
                    <label className="mr-2">{size}</label>
                    <input
                      type="number"
                      value={formData.sizes[size] || ""}
                      onChange={(e) => handleSizeChange(size, e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpdateProduct}
              className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Update Product
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Modal for error/success */}
      <Modal
        isOpen={isModalOpen}
        type={modalType}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)} // Close modal handler
      />
    </motion.div>
  );
};

export default UpdateProduct;
