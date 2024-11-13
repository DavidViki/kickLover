import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import OrderContext from "../../context/OrderContext";
import { Link } from "react-router-dom";
import Modal from "../Modal";

const UpdateOrderStatus = () => {
  const { state, fetchAllOrders, updateOrderStatus, loading } =
    useContext(OrderContext);
  const [selectedStatus, setSelectedStatus] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Function to determine valid status options based on current status
  const getNextStatuses = (currentStatus) => {
    switch (currentStatus) {
      case "Pending":
        return ["Confirmed", "Shipped", "Delivered"];

      case "Confirmed":
        return ["Shipped", "Delivered"];

      case "Shipped":
        return ["Delivered"];

      default:
        return []; // For 'Cancelled' or 'Delivered', no further status options
    }
  };

  const handleStatusChange = (orderId, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [orderId]: status,
    }));
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      await updateOrderStatus(orderId, selectedStatus[orderId]);

      // Show sucess modal
      setModalType("success");
      setModalMessage("Order status updated!");
      setIsModalOpen(true);

      fetchAllOrders(); // Refresh orders after update
    } catch (error) {
      // Show error modal
      setModalType("error");
      setModalMessage("Failed to update order status");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Display loading spinner if data is being fetched
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-h-screen overflow-hidden"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Update Order Status
      </h2>
      <div className="overflow-x-auto overflow-y-auto max-h-screen">
        <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
              <th className="w-1/5 px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Order ID
              </th>
              <th className="w-1/5 px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Current Status
              </th>
              <th className="w-1/5 px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status Update
              </th>
              <th className="w-1/5 px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="w-1/5 px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Total
              </th>
              <th className="w-1/5 px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {state.allOrders.map((order) => (
              <motion.tr whileHover={{ scale: 1.02 }} key={order._id}>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-500 dark:text-white">
                  <p className="mb-1">
                    <strong>{order.orderStatus}</strong>
                  </p>
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <select
                    value={selectedStatus[order._id] || order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    disabled={
                      order.orderStatus === "Cancelled" ||
                      order.orderStatus === "Delivered"
                    }
                    className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded p-1"
                  >
                    <option value={order.orderStatus} disabled>
                      {order.orderStatus}
                    </option>
                    {getNextStatuses(order.orderStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  ${order.totalPrice.toFixed(2)}
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <button
                    onClick={() => handleUpdateStatus(order._id)}
                    disabled={!getNextStatuses(order.orderStatus).length}
                    className={`px-3 py-2 text-xs sm:text-sm rounded ${
                      getNextStatuses(order.orderStatus).length > 0
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Update
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
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

export default UpdateOrderStatus;
