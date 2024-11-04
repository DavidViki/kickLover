import React, { createContext, useReducer, useState } from "react";
import axios from "axios";

// Create Context
const OrderContext = createContext();

// Reducer
const orderReducer = (state, action) => {
  switch (action.type) {
    case "PLACE_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };

    case "CLEAR_ORDERS":
      return { ...state, orders: [] };

    case "SET_USER_ORDERS":
      return { ...state, orders: action.payload };

    case "SET_ORDER_BY_ID":
      return { ...state, orderDetails: action.payload };

    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, { orders: [] });
  const [loading, setLoading] = useState(false);

  const placeOrder = async (orderData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/api/orders", orderData, config);
      dispatch({ type: "PLACE_ORDER", payload: response.data });
      console.log(orderData);
      return response.data; // Return the order data for further use
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get("/api/orders/my-orders", config);
      dispatch({ type: "SET_USER_ORDERS", payload: response.data });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(`/api/orders/${orderId}/cancel`, config);
      // Update the orders state after cancellation
      dispatch({
        type: "SET_USER_ORDERS",
        payload: state.orders.filter((order) => order._id !== orderId),
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderById = async (orderId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(`/api/orders/${orderId}`, config);
      dispatch({ type: "SET_ORDER_BY_ID", payload: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        dispatch,
        loading,
        placeOrder,
        fetchUserOrders,
        cancelOrder,
        fetchOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
