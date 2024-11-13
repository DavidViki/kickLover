import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import AdminProductContext from "../../context/AdminProductContext";
import Modal from "../Modal";

const DeleteProduct = () => {
  const { products, deleteProduct, loading, error } =
    useContext(AdminProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "success" or "error"
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
  }, [products]);

  const handleProductSelect = (e) => {
    const productId = e.target.value;
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product);
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    try {
      deleteProduct(selectedProduct._id);

      // Show success modal
      setModalType("success");
      setModalMessage("Product deleted successfully!");
      setIsModalOpen(true);

      setConfirmDelete(false);
      setSelectedProduct(null);
    } catch (error) {
      // Show error modal
      setModalType("error");
      setModalMessage(
        error ||
          error.response.message ||
          "There was an error deleting the product."
      );
      setIsModalOpen(true);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
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
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mx-auto w-full md:w-1/2 mt-8"
    >
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Delete Product
      </h1>

      {/* Product Dropdown */}
      <motion.label
        htmlFor="product"
        className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Select Product to Delete:
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

      {selectedProduct && !confirmDelete && (
        <motion.button
          onClick={handleDeleteClick}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >{`Delete ${selectedProduct.name}`}</motion.button>
      )}

      {/* Confirmation Dialog */}
      {confirmDelete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md"
        >
          <p className="text-lg font-semibold mb-4">
            Are you sure you want to delete {selectedProduct.name}?
          </p>
          <div className="flex justify-between">
            <motion.button
              onClick={handleConfirmDelete}
              className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yes, Delete
            </motion.button>
            <motion.button
              onClick={handleCancelDelete}
              className="px-4 py-2 font-semibold text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
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

export default DeleteProduct;
