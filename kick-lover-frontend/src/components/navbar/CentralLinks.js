import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const CentralLinks = ({ handleClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="flex space-x-6">
      {/* Navigation Links */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link
          onClick={handleClick}
          to="/"
          className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
        >
          Home
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link
          onClick={handleClick}
          to="/men"
          className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
        >
          Men
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link
          onClick={handleClick}
          to="/women"
          className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
        >
          Women
        </Link>
      </motion.div>

      {/* Brands Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <motion.button
          onClick={toggleDropdown}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 focus:outline-none"
        >
          Brands
        </motion.button>

        {/*Dropdown Menu */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 w-32"
            >
              <li
                onClick={handleClick}
                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Link
                  onClick={() => setDropdownOpen(false)}
                  to="/nike"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
                >
                  Nike
                </Link>
              </li>
              <li
                onClick={handleClick}
                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Link
                  onClick={() => setDropdownOpen(false)}
                  to="/adidas"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
                >
                  Adidas
                </Link>
              </li>
              <li
                onClick={handleClick}
                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Link
                  onClick={() => setDropdownOpen(false)}
                  to="/reebok"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
                >
                  Reebok
                </Link>
              </li>
              <li
                onClick={handleClick}
                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Link
                  onClick={() => setDropdownOpen(false)}
                  to="/puma"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
                >
                  Puma
                </Link>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CentralLinks;
