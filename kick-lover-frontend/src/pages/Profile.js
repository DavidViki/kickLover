import React, { useEffect, useContext, useState } from "react";
import { motion } from "framer-motion";
import OrderContext from "../context/OrderContext";
import Modal from "../components/Modal";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { state, fetchUserOrders, cancelOrder, loading } =
    useContext(OrderContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'success' or 'error'
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);

      // Show success Modal
      setModalType("success");
      setModalMessage("Successfully cancelled an order!");
      setIsModalOpen(true);

      fetchUserOrders();
    } catch (error) {
      setModalType("error");
      setModalMessage(
        error ||
          error.response.message ||
          "Failed to cancel order. Please try again!"
      );
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 h-screen">
        <div
          className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-blue-600"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Your Profile
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">
          Your Orders
        </h2>
        {state.orders.length > 0 ? (
          <ul className="mt-4">
            {state.orders.map((order) => (
              <motion.li
                onClick={() => navigate(`/order/${order._id}`)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={order._id}
                className="bg-gray-100 dark:bg-gray-800 p-4 mb-2 border border-gray-300 rounded-md dark:border-gray-700 flex justify-between items-center"
              >
                <div>
                  <p className="text-gray-800 dark:text-gray-200">
                    Order ID: {order._id}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Total: ${order.totalPrice.toFixed(2)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Status: {order.orderStatus}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Created At: {format(new Date(order.createdAt), "PPP")}
                    {/* Display createdAt */}
                  </p>
                  {/* Conditionally render the status date based on the order status */}
                  {order.orderStatus === "Cancelled" && (
                    <p className="text-gray-600 dark:text-gray-400">
                      Cancelled At: {format(new Date(order.cancelledAt), "PPP")}
                    </p>
                  )}
                  {order.orderStatus === "Delivered" && (
                    <p className="text-gray-600 dark:text-gray-400">
                      Delivered At: {format(new Date(order.deliveredAt), "PPP")}
                    </p>
                  )}
                  {order.orderStatus === "Confirmed" && (
                    <p className="text-gray-600 dark:text-gray-400">
                      Confirmed At: {format(new Date(order.confirmedAt), "PPP")}
                    </p>
                  )}
                  {order.orderStatus === "Shipped" && (
                    <p className="text-gray-600 dark:text-gray-400">
                      Shipped At: {format(new Date(order.shippedAt), "PPP")}
                    </p>
                  )}
                </div>
                {/* Cancel Button */}
                {["Pending", "Confirmed"].includes(order.orderStatus) && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md transition-all duration-300"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </motion.button>
                )}
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No orders found.</p>
        )}
      </div>

      {/* Modal for error/success */}
      <Modal
        isOpen={isModalOpen}
        type={modalType}
        message={modalMessage}
        onClose={closeModal}
      />
    </motion.div>
  );
};

export default Profile;
