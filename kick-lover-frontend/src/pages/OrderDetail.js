import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import OrderContext from "../context/OrderContext";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams();
  const { fetchOrderById, loading, cancelOrder } = useContext(OrderContext);
  const [order, setOrder] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'success' or 'error'
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (id) {
      fetchOrderById(id).then((data) => {
        setOrder(data);
      });
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCancelOrder = async () => {
    try {
      if (order) {
        // Cancel the order
        await cancelOrder(order._id);

        setModalType("success");
        setModalMessage("Order cancelled!");
        setIsModalOpen(true);

        // Fetch the updated order details
        const updatedOrder = await fetchOrderById(order._id);
        setOrder(updatedOrder);
      } else {
        setModalType("error");
        setModalMessage("Order unavailable");
      }
    } catch (error) {
      setModalType("error");
      setModalMessage(
        error || error.response.message || "Failed to cancel order."
      );
      setIsModalOpen(true);
    }
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

  if (!order) {
    return (
      <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 h-screen">
        <p className="text-gray-800 dark:text-gray-200">Order not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto h-screen p-6 flex flex-col justify-center bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200 text-center">
        Order Details
      </h1>

      {/* Customer and Shipping Information */}
      <motion.div
        className="p-4 border rounded dark:border-gray-700 dark:bg-gray-800 bg-gray-100 mb-4"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">
          Customer Details
        </h2>
        <p className="text-gray-800 dark:text-gray-200">
          <strong>User ID: </strong> {order.user._id}
        </p>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
          Shipping Information
        </h3>
        <div className="space-y-2">
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Address: </strong>
            {order.shippingAddress.address}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <strong>City: </strong>
            {order.shippingAddress.city}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Postal Code: </strong>
            {order.shippingAddress.postalCode}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Country: </strong>
            {order.shippingAddress.country}
          </p>
        </div>
      </motion.div>

      <div className="text-center mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          Order ID: {order._id}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Status: {order.orderStatus}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Created At: {format(new Date(order.createdAt), "PPP")}
        </p>
        {/* Conditionally render the status date based on the order status */}
        {order.cancelledAt && (
          <p className="text-gray-600 dark:text-gray-400">
            Cancelled At: {format(new Date(order.cancelledAt), "PPP")}
          </p>
        )}
        {order.confirmedAt && (
          <p className="text-gray-600 dark:text-gray-400">
            Confirmed At: {format(new Date(order.confirmedAt), "PPP")}
          </p>
        )}
        {order.shippedAt && (
          <p className="text-gray-600 dark:text-gray-400">
            Shipped At: {format(new Date(order.shippedAt), "PPP")}
          </p>
        )}
        {order.deliveredAt && (
          <p className="text-gray-600 dark:text-gray-400">
            Delivered At: {format(new Date(order.deliveredAt), "PPP")}
          </p>
        )}
      </div>

      {["Pending", "Confirmed"].includes(order.orderStatus) && (
        <div className="flex justify-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCancelOrder}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
          >
            Cancel Order
          </motion.button>
        </div>
      )}

      <div>
        <h2 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200 text-center">
          Items
        </h2>
        <ul className="space-y-2">
          {order.orderItems.map((item) => (
            <motion.li
              key={item.product}
              className="p-4 border rounded dark:border-gray-700 dark:bg-gray-800 bg-gray-100"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={`/sneakers/${item.product}`}>
                <p className="text-gray-800 dark:text-gray-200">{item.name}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Quantity: {item.quantity}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Size: {item.size}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Price: ${item.price.toFixed(2)}
                </p>
              </Link>
            </motion.li>
          ))}
        </ul>
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

export default OrderDetail;
