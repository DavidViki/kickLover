import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import {
  FaUser,
  FaShoppingCart,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

const AuthLinks = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex space-x-8">
      {!user ? (
        // If no user is logged in
        <>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
            >
              <FaSignInAlt /> Login
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
            >
              <FaUserPlus /> Register
            </Link>
          </motion.div>
        </>
      ) : user.isAdmin ? (
        // If the user is an admin
        <>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/admin"
              className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
            >
              <FaTachometerAlt /> Admin
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={logout}
              className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
            >
              <FaSignOutAlt /> Logout
            </button>
          </motion.div>
        </>
      ) : (
        // If a regular user is logged in
        <>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/profile"
              className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
            >
              <FaUser /> Profile
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/cart"
              className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
            >
              <FaShoppingCart /> Cart
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={logout}
              className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
            >
              <FaSignOutAlt /> Logout
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
