import React, { createContext, useReducer, useEffect } from "react";

// Create context
const CartContext = createContext();

// Initial state
const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );

      if (existingItemIndex >= 0) {
        // If item with the same product ID and size already exists, update quantity
        const updatedCartItems = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, cartItems: updatedCartItems };
      } else {
        // Otherwise, add the new item to the cart
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) => {
            if (
              item._id === action.payload._id &&
              item.size === action.payload.size
            ) {
              return item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : null; // Mark for removal if quantity reaches 0
            }
            return item;
          })
          .filter((item) => item !== null), // Remove items marked as null
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            !(
              item._id === action.payload._id &&
              item.size === action.payload.size
            )
        ),
      };
    case "CLEAR_CART":
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

// Cart Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  //Persist cart items to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
