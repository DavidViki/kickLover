import React, { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import OrderContext from "../context/OrderContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Checkout = () => {
  const { cartItems, dispatch } = useContext(CartContext);
  const { placeOrder } = useContext(OrderContext);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'success' or 'error'
  const [modalMessage, setModalMessage] = useState("");

  const generateFakeId = () => {
    const prefix = "TEST_"; // Prefix to identify as a test ID
    const randomNum = Math.floor(Math.random() * 1000000); // Random number
    return `${prefix}${randomNum}`;
  };

  const fakeId = generateFakeId();

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalType === "success") {
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      paymentDetails: {
        transactionId: fakeId, // example transaction ID
        method: "Credit Card",
      },
      orderItems: cartItems.map((item) => ({
        product: item._id, // the product ID
        size: item.size, // selected size
        quantity: item.quantity, // quantity ordered
        price: item.price, // price of the item
        name: item.name, // name of the product
        imageUrl: item.imageUrl, // image URL of the product
      })),
      shippingAddress: {
        address: "2",
        city: "2",
        postalCode: "2",
        country: "2",
      },
      paymentMethod: "Credit Card",
      totalPrice: cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };

    try {
      await placeOrder(orderData);

      setModalType("success");
      setModalMessage("Order placed successfully!");
      setIsModalOpen(true);

      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      setModalType("error");
      setModalMessage(
        error ||
          error.response.message ||
          "Failed to place order. Please try again!"
      );
      setIsModalOpen(true);
    }
  };

  const totalAmount = cartItems
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2);

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-gray-900 p-6 flex flex-col items-center dark:text-gray-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Cart Summary */}
      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} className="flex justify-between py-2">
              <span>{item.name}</span>
              <span>{item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>
        <div className="flex justify-between">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-lg font-bold">${totalAmount}</span>
        </div>
      </div>

      {/* Shipping Form */}
      <form
        onSubmit={handleCheckoutSubmit}
        className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <div className="mb-4">
          <label
            className="block mb-2 text-gray-700 dark:text-gray-300"
            htmlFor="address"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingInfo.address}
            placeholder="Address"
            onChange={handleInputChange}
            required
            className="w-full p-2 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
          />
        </div>

        <div className="flex mb-4">
          <div className="mr-2 w-1/2">
            <label
              className="block mb-2 text-gray-700 dark:text-gray-300"
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingInfo.city}
              placeholder="City"
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="w-1/2">
            <label
              className="block mb-2 text-gray-700 dark:text-gray-300"
              htmlFor="postalCode"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={shippingInfo.postalCode}
              placeholder="Postal Code"
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-gray-700 dark:text-gray-300"
            htmlFor="country"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={shippingInfo.country}
            placeholder="Country"
            onChange={handleInputChange}
            required
            className="w-full p-2 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 rounded-lg"
        >
          Confirm Order
        </button>
      </form>

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

export default Checkout;
