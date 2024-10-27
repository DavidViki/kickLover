import React, { createContext, useState } from "react";
import axios from "axios";

// Create Context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // For storing filtered product
  const [product, setProduct] = useState(null); // For storing a single product by ID
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products by brand
  const fetchProductsByBrand = async (brand) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/products/brand/${brand}`);
      setProducts(response.data.products);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fetch product by ID
  const fetchProductById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data.product);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fetch products by category
  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/products/category/${category}`);
      setProducts(response.data.products);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        product,
        loading,
        error,
        fetchProductsByBrand,
        fetchProductById,
        fetchProductsByCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for consuming ProductContext
export const useProductContext = () => React.useContext(ProductContext);
