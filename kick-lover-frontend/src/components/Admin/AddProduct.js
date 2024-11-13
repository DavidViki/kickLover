import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import AdminProductContext from "../../context/AdminProductContext";
import Modal from "../Modal";

const AddProduct = () => {
  const { addProduct, loading, fetchProducts } =
    useContext(AdminProductContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'success' or 'error'
  const [modalMessage, setModalMessage] = useState("");

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    brand: "",
    category: "men",
    sizes: {},
  });

  const sizes = {
    men: [40, 41, 42, 43, 44, 45, 46, 47],
    women: [36, 37, 38, 39, 40, 41, 42, 43],
  };

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSizeQuantityChange = (size, quantity) => {
    setProductData((prevState) => ({
      ...prevState,
      sizes: {
        ...prevState.sizes,
        [size]: quantity,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct(productData);

      fetchProducts();

      setModalType("success");
      setModalMessage("Product added successfully!");
      setIsModalOpen(true);

      setProductData({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        brand: "",
        category: "men",
        sizes: {
          40: "",
          41: "",
          42: "",
          43: "",
          44: "",
          45: "",
          46: "",
          47: "",
        },
      });
    } catch (error) {
      // If there is an error, show the error message from the context
      setModalType("error");
      setModalMessage(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to add product. Please try again!"
      );
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      className="max-w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Brand Dropdown */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Brand
          </label>
          <select
            name="brand"
            value={productData.brand}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-700 bg-white dark:text-white"
            required
          >
            <option value="">Select Brand</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Reebok">Reebok</option>
            <option value="Puma">Puma</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Category Checkboxes */}
        <div className="flex items-center space-x-4">
          <label className="text-gray-700 dark:text-gray-300">Category</label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="category"
              value="men"
              checked={productData.category === "men"}
              onChange={handleInputChange}
              className="form-radio text-indigo-600 dark:bg-gray-700"
            />
            <span className="ml-2 dark:text-gray-300">Men</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="category"
              value="women"
              checked={productData.category === "women"}
              onChange={handleInputChange}
              className="form-radio text-indigo-600 dark:bg-gray-700"
            />
            <span className="ml-2 dark:text-gray-300">Women</span>
          </label>
        </div>

        {/* Dynamic Sizes & Quantities */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
            Sizes & Quantities
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {sizes[productData.category].map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <label className="block text-gray-700 dark:text-gray-300">
                  {size}
                </label>
                <input
                  type="number"
                  name={`size-${size}`}
                  placeholder="Quantity"
                  onChange={(e) =>
                    handleSizeQuantityChange(size, e.target.value)
                  }
                  className="p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Add Product
          </motion.button>
        </div>
      </form>

      {/* Modal for error/success */}
      <Modal
        isOpen={isModalOpen}
        type={modalType}
        message={modalMessage}
        onClose={closeModal}
      />
    </motion.div>
  );
};

export default AddProduct;
