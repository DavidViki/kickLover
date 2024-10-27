import React, { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { useParams } from "react-router-dom"; // To access the product ID from URL
import { motion } from "framer-motion"; // For animations

const SneakerPage = () => {
  const { id } = useParams();
  const { fetchProductById, product, error, loading } = useProductContext();

  useEffect(() => {
    fetchProductById(id);
  }, []);

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

  if (error) {
    return <div>Error: {error}</div>; // Display an error message if the request fails
  }

  if (!product) {
    return <div>Product not found</div>; // Handle the case where the product is null
  }

  return (
    <motion.div
      className="sneaker-page container mx-auto p-6 dark:bg-gray-900 bg-gray-100 min-h-screen" // Apply background color for dark/light mode
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Sneaker Image */}
        <motion.div
          className="flex justify-center mb-8 md:mb-0"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto max-w-md object-contain rounded-lg shadow-lg" // Ensure the image fits without cropping
          />
        </motion.div>

        {/* Sneaker Details */}
        <motion.div
          className="flex flex-col justify-center text-gray-900 dark:text-gray-100"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <div className="text-xl mb-6">
            <span>${product.price}</span>
          </div>

          <div className="mb-6">
            <label htmlFor="size" className="block text-sm font-medium mb-2">
              Choose Size:
            </label>
            <select
              id="size"
              name="size"
              className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white"
            >
              {/* Loop through the sizes object and display size and stock */}
              {product.sizes &&
                Object.entries(product.sizes).map(([size, stock]) => (
                  <option key={size} value={size}>
                    {size} (In stock: {stock})
                  </option>
                ))}
            </select>
          </div>

          <motion.button
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SneakerPage;
