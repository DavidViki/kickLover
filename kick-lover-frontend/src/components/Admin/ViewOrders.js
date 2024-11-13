import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import OrderContext from "../../context/OrderContext";
import { Link } from "react-router-dom";

const ViewOrders = () => {
  const { state, fetchAllOrders, loading } = useContext(OrderContext);

  useEffect(() => {
    fetchAllOrders(); // Fetch all orders when the component mounts
  }, []);

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
        View Orders
      </h2>
      <div className="overflow-x-auto overflow-y-auto max-h-screen w-full">
        {/* Table for larger screens */}
        <table className="hidden md:table w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700 top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {state.allOrders.map((order) => (
              <motion.tr
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={order._id}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {order.orderStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  ${order.totalPrice.toFixed(2)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Cards for mobile view */}
        <div className="block md:hidden space-y-4">
          {state.allOrders.map((order) => (
            <motion.div
              key={order._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg p-4"
            >
              <div className="flex justify-between items-center">
                <Link
                  to={`/order/${order._id}`}
                  className="text-lg font-semibold text-blue-600 dark:text-blue-400"
                >
                  Order ID: {order._id}
                </Link>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-2 text-gray-800 dark:text-gray-300">
                <p>
                  Status:{" "}
                  <span className="font-medium">{order.orderStatus}</span>
                </p>
                <p>
                  Total:{" "}
                  <span className="font-medium">
                    {order.totalPrice.toFixed(2)}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ViewOrders;
