import React, { useContext, useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext";
import { useParams } from "react-router-dom"; // To access the product ID from URL
import { motion } from "framer-motion";
import CartContext from "../context/CartContext";
import Modal from "../components/Modal";

const SneakerPage = () => {
  const { id } = useParams();
  const { fetchProductById, product, error, loading } = useProductContext();
  const { dispatch } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(""); // State to keep track of selected size

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'success' or 'error'
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    fetchProductById(id);
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setModalType("error");
      setModalMessage("Please select a size");
      setIsModalOpen(true);
      return;
    }
    const itemToAdd = {
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: selectedSize,
      quantity: 1,
    };

    dispatch({ type: "ADD_TO_CART", payload: itemToAdd });

    setSelectedSize("");

    setModalType("success");
    setModalMessage("Successfully added to cart!");
    setIsModalOpen(true);
  };

  const handleSizeChange = (size) => {
    if (selectedSize === size) {
      // Deselect if the size is already selected
      setSelectedSize("");
    } else {
      // Select the new size
      setSelectedSize(size);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          <div className="text-lg mb-4">
            <p>
              {product.description.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className="text-xl mb-6">
            <span>${product.price}</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-2 flex-wrap">
              {Object.entries(product.sizes).map(([size, stock]) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-3 py-2 rounded-md font-medium ${
                    selectedSize === size
                      ? "bg-blue-500 text-white ring-2 ring-blue-600"
                      : stock > 0
                      ? "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } transition duration-200 ease-in-out`}
                  disabled={stock === 0}
                >
                  {size}
                </button>
              ))}
            </div>

            <motion.button
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </div>

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

export default SneakerPage;
