import React from "react";
import { motion } from "framer-motion";

const Modal = ({ isOpen, type, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm dark:bg-gray-900 dark:bg-opacity-60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full ${
          type === "success" ? "border-green-500" : "border-red-500"
        } border-4 dark:bg-gray-800 dark:text-white dark:border-gray-600`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h3
          className={`text-2xl font-bold ${
            type === "success" ? "text-green-500" : "text-red-500"
          } dark:${type === "success" ? "text-green-300" : "text-red-300"}`}
        >
          {type === "success" ? "Success!" : "Error"}
        </h3>
        <p className="mt-4 text-gray-700 dark:text-gray-300">{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
