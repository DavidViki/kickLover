import React from "react";
import { motion } from "framer-motion";
import Map from "./Map"; // Make sure to import your Map component

const NewStoreOpening = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md my-6"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        New Store Opening!
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Join us for the grand opening of our new store location!
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        <strong>Date:</strong> November 15, 2024
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        <strong>Location:</strong> 123 Sneaker St, Sneakerville, ST 12345
      </p>
      <Map />
      <p className="text-gray-700 dark:text-gray-300">
        Be one of the first to check out our new store and enjoy exclusive
        opening day discounts!
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        We will have live music, refreshments, and the first 50 customers will
        receive a special gift!
      </p>
    </motion.section>
  );
};

export default NewStoreOpening;
