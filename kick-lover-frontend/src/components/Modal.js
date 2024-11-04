import React from "react";
import { motion } from "framer-motion";

const Modal = ({ isOpen, type, message, onClose }) => {
  if (!isOpen) return null;

  const SuccessIcon = () => (
    <motion.svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.path
        d="M5 13l4 4L19 7"
        stroke="green"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.svg>
  );

  const ErrorIcon = () => (
    <motion.svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="rgba(255, 0, 0, 0.6)"
        strokeWidth="2"
        fill="rgba(255, 0, 0, 0.1)"
      />
      <motion.line
        x1="8"
        y1="8"
        x2="16"
        y2="16"
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ x1: 12, y1: 12, x2: 12, y2: 12 }}
        animate={{ x1: 8, y1: 8, x2: 16, y2: 16 }}
        transition={{ duration: 0.3 }}
      />
      <motion.line
        x1="8"
        y1="16"
        x2="16"
        y2="8"
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ x1: 12, y1: 12, x2: 12, y2: 12 }}
        animate={{ x1: 8, y1: 16, x2: 16, y2: 8 }}
        transition={{ duration: 0.3 }}
      />
    </motion.svg>
  );

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
        {/* Conditional rendering based on message type */}
        {type === "success" && (
          <motion.div
            className="flex items-center text-green-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SuccessIcon />
            <span>{message}</span>
          </motion.div>
        )}
        {type === "error" && (
          <motion.div
            className="flex items-center text-red-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ErrorIcon />
            <span>{message}</span>
          </motion.div>
        )}
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
