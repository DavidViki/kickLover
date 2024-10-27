import React from "react";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      className="flex items-center space-x-1 cursor-pointer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.span
        className="text-2xl font-bold text-blue-500 dark:text-blue-300"
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        Kick
      </motion.span>
      <motion.span
        className="text-2xl font-bold text-pink-500 dark:text-pink-300"
        whileHover={{ scale: 1.2, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
      >
        Lover
      </motion.span>
    </motion.div>
  );
};

export default Logo;
