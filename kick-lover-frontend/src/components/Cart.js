import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartItems) {
    return <div>Loading</div>;
  }

  const handleDecreaseQuantity = (itemId, size) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { _id: itemId, size } });
  };

  const handleRemoveFromCart = (itemId, size) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { _id: itemId, size } });
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 p-5">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Your Cart
      </h2>
      {cartItems.length === 0 ? (
        <motion.p
          className="text-center text-gray-500 dark:text-gray-300 flex-grow flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your cart is empty.
        </motion.p>
      ) : (
        <div className="flex-grow overflow-y-auto">
          {cartItems.map((item) => (
            <motion.div
              key={`${item._id}-${item.size}`}
              className="flex items-center justify-between mb-4 p-4 bg-white dark:bg-gray-700 rounded-md shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={`/sneakers/${item._id}`}
                className="flex items-center flex-grow"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 rounded-md mr-4"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {item.name} (Size: {item.size})
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
              </Link>
              <div className="flex items-center">
                {item.quantity > 1 && ( // Only show decrease button if quantity > 1
                  <button
                    className="bg-yellow-500 text-white rounded-md px-3 py-1 hover:bg-yellow-600 transition mr-2"
                    onClick={() => handleDecreaseQuantity(item._id, item.size)}
                  >
                    -
                  </button>
                )}
                <button
                  className="bg-red-500 text-white rounded-md px-3 py-1 hover:bg-red-600 transition"
                  onClick={() => handleRemoveFromCart(item._id, item.size)}
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="mt-4 border-t border-gray-300 dark:border-gray-600 pt-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Total: ${totalPrice.toFixed(2)}
          </h3>
          <button
            onClick={handleCheckout}
            className="mt-3 w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
