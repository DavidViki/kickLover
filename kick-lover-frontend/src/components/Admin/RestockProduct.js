import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import AdminProductContext from "../../context/AdminProductContext";
import Modal from "../Modal";

const RestockProduct = () => {
  const { products, restockProduct, fetchProducts, loading } =
    useContext(AdminProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "success" or "error"
  const [modalMessage, setModalMessage] = useState("");

  // Fetch products on component mount (or if products list changes)
  useEffect(() => {
    if (products.length > 0) {
      setSelectedProduct(products[0]); // Select first product by default
    }
  }, [products]);

  // Update newStock based on the category (resetting sizes)
  useEffect(() => {
    if (selectedProduct) {
      const sizes =
        selectedProduct.category === "men"
          ? { 40: 0, 41: 0, 42: 0, 43: 0, 44: 0, 45: 0, 46: 0, 47: 0 }
          : { 36: 0, 37: 0, 38: 0, 39: 0, 40: 0, 41: 0, 42: 0, 43: 0 };
      setNewStock(sizes);
    }
  }, [selectedProduct]);

  // Handle product selection from dropdown
  const handleProductSelect = (e) => {
    const productId = e.target.value;
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product);
  };

  // Handle stock input change
  const handleStockChange = (size, value) => {
    setNewStock({ ...newStock, [size]: Number(value) });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      restockProduct(selectedProduct._id, newStock); // Call restockProduct function

      fetchProducts();
      // Show success modal
      setModalType("success");
      setModalMessage("Product restocked successfully!");
      setIsModalOpen(true);
    } catch (error) {
      // Show error modal
      setModalType("error");
      setModalMessage(
        error ||
          error.response.message ||
          "There was an error restocking the product."
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg rounded-lg p-6 mx-auto w-full md:w-1/2 mt-8"
    >
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Restock Product
      </h1>

      {/* Dropdown to select product */}
      <motion.label
        htmlFor="product"
        className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Select Product:
      </motion.label>
      <motion.select
        id="product"
        onChange={handleProductSelect}
        disabled={loading}
        className="w-full px-3 py-2 mb-4 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.name} ({product.category})
          </option>
        ))}
      </motion.select>

      {selectedProduct && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Restock Sizes for {selectedProduct.name} ({selectedProduct.category}
            )
          </h2>

          {/* Render size input fields based on category */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {Object.keys(newStock).map((size) => (
              <motion.div
                key={size}
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: 0.1 * size }}
              >
                <label
                  htmlFor={`size-${size}`}
                  className="text-gray-700 dark:text-gray-300 font-medium"
                >
                  Size {size}:
                </label>
                <input
                  id={`size-${size}`}
                  type="number"
                  value={newStock[size]}
                  onChange={(e) => handleStockChange(size, e.target.value)}
                  className="w-24 px-3 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                  disabled={loading}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Restock
          </motion.button>
        </form>
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

export default RestockProduct;
