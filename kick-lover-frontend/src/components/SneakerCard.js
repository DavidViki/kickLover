import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SneakerCard = ({ product }) => {
  const { _id, brand, name, imageUrl, price } = product;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 transition-transform"
    >
      <Link to={`/sneakers/${_id}`} className="block">
        {/* Sneaker Image */}
        <motion.img
          src={imageUrl}
          alt={name}
          className="w-full h-56 object-cover rounded-md mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Sneaker Brand */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{brand}</p>

        {/* Sneaker Name */}
        <p className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          {name}
        </p>

        {/* Sneaker Price */}
        <p className="text-gray-600 dark:text-gray-300">{price}€</p>
      </Link>
    </motion.div>
  );
};

export default SneakerCard;
