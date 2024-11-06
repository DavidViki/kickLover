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

    case "SET_ALL_ORDERS":
      return { ...state, allOrders: action.payload };

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        allOrders: state.allOrders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };

    case "DELETE_ORDER":
      return {
        ...state,
        allOrders: state.allOrders.filter(
          (order) => order._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, {
    orders: [],
    allOrders: [],
  });
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

  // Fetch all orders for the admin
  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get("/api/orders", config);
      dispatch({ type: "SET_ALL_ORDERS", payload: response.data });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update order status for admin
  const updateOrderStatus = async (orderId, newStatus) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/orders/${orderId}`,
        { newStatus },
        config
      );

      // Update order status in the context state
      dispatch({ type: "UPDATE_ORDER_STATUS", payload: data });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an order for admin
  const deleteOrder = async (orderId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Make DELETE request to the backend
      const { data } = await axios.delete(`/api/orders/${orderId}`, config);

      // Dispatch action to remove the order from the context state
      dispatch({
        type: "DELETE_ORDER",
        payload: orderId,
      });

      return data;
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
        fetchAllOrders,
        updateOrderStatus,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
