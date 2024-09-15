import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useOutsideClick from '../hooks/useOutsideClick';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isBrandsOpen, setBrandsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearchBar = () => {
    setSearchOpen(!isSearchOpen);
  };

  const toggleBrandsDropdown = () => {
    setBrandsOpen(!isBrandsOpen);
  };

  const closeDropdown = () => {
    setBrandsOpen(false);
  };

  const dropdownRef = useOutsideClick(closeDropdown);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 relative flex items-center justify-between">
      {/* Left side- Logo */}
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="text-xl font-bold text-gray-900 dark:text-white"
      >
        <Link to="/">KickLover</Link>
      </motion.div>

      {/* Center - Links */}
      <motion.div
        className={`flex space-x-6 items-center transition-all duration-300 ${isSearchOpen ? 'pl-0' : 'pl-10'}`}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            Home
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/men"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            Men
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/women"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            Women
          </Link>
        </motion.div>

        {/* Brands dropdown with animation */}
        <div className="relative" ref={dropdownRef}>
          <motion.button
            onClick={toggleBrandsDropdown}
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Brands
          </motion.button>
          {/* AnimatePresence handles smooth entry/exit of the dropdown */}
          <AnimatePresence>
            {isBrandsOpen && (
              <motion.div
                className="absolute bg-white dark:bg-gray-800 shadow-md rounded-md mt-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/nike"
                  onClick={toggleBrandsDropdown}
                  className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Nike
                </Link>
                <Link
                  to="/adidas"
                  onClick={toggleBrandsDropdown}
                  className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Adidas
                </Link>
                <Link
                  to="/reebok"
                  onClick={toggleBrandsDropdown}
                  className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Reebok
                </Link>
                <Link
                  to="/puma"
                  onClick={toggleBrandsDropdown}
                  className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Puma
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right side - Icons */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className=""
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isSearchOpen ? 1 : 0,
                scale: isSearchOpen ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-1 rounded-md bg-gray-200 dark:bg-gray-800 dark:text-white"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Icon */}
        <motion.button
          onClick={toggleSearchBar}
          className="text-gray-600 dark:text-gray-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSearch size={24} />
        </motion.button>
        {/* Theme toggle */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <ThemeToggle />
        </motion.div>

        {/* Cart */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Link to="/cart" className="relative">
            <FaShoppingCart
              className="text-gray-600 dark:text-gray-300"
              size={24}
            />
            {/* Optional cart counter */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              3
            </span>
          </Link>
        </motion.div>

        {/* Login/Register */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/login"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            Login/Register
          </Link>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <motion.button
          onClick={toggleMobileMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiMenu className="text-gray-600 dark:text-gray-300" size={24} />
        </motion.button>
      </div>

      {/* Mobile Menu Links */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className="block px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              Home
            </Link>
            <Link
              to="/men"
              className="block px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              Men
            </Link>
            <Link
              to="/women"
              className="block px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              Women
            </Link>
            {/* Brands dropdown (on mobile) */}
            <Link
              to="/nike"
              className="block px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              Nike
            </Link>
            <Link
              to="/adidas"
              className="block px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              Adidas
            </Link>
            <Link
              to="/reebok"
              className="block px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              Reebok
            </Link>
            <Link
              to="/puma"
              className="block px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              Puma
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
