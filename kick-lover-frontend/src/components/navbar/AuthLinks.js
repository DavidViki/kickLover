import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import CartContext from "../../context/CartContext";
import {
  FaUser,
  FaShoppingCart,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

const AuthLinks = ({ handleClick }) => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex space-x-8">
      {!user ? (
        // If no user is logged in
        <>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              onClick={handleClick}
              to="/login"
              className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
            >
              <FaSignInAlt /> Login
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              onClick={handleClick}
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
              onClick={handleClick}
              to="/admin"
              className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
            >
              <FaTachometerAlt /> Admin
            </Link>
          </motion.div>
          <motion.div
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={handleLogout}
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
              onClick={handleClick}
              to="/profile"
              className="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
            >
              <FaUser /> Profile
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              onClick={handleClick}
              to="/cart"
              className="relative text-lg text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300"
            >
              <FaShoppingCart /> Cart
              {/* Cart item count badge */}
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {itemCount}
                </span>
              )}
            </Link>
          </motion.div>
          <motion.div
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={handleLogout}
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
