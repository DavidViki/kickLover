import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

const ToggleSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.div
      className="flex items-center cursor-pointer"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* The Toggle Switch */}
      <div
        className={`relative w-14 h-8 rounded-full transition-colors ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
        }`}
      >
        <motion.div
          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow ${
            theme === "dark" ? "left-1" : "right-1"
          }`}
          layout
        />
      </div>
      {/* Icons */}
      <div className="flex items-center ml-2">
        <motion.div
          className={`text-lg ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: theme === "dark" ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaSun />
        </motion.div>
        <motion.div
          className={`text-lg ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: theme === "dark" ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          style={{ marginLeft: theme === "dark" ? "8px" : "0" }}
        >
          <FaMoon />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ToggleSwitch;
