import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AdminProductContext = createContext();

export const AdminProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products for admin (same as user, but for admin operations)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/products");
      setProducts(response.data.products);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new product
  const addProduct = async (newProduct) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/api/products", newProduct, config);
      setProducts([...products, response.data]);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing product
  const updateProduct = async (updatedProduct) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.put(
        `/api/products/${updatedProduct._id}`,
        updatedProduct,
        config
      );
      setProducts(
        products.map((product) =>
          product._id === updatedProduct._id ? response.data : product
        )
      );
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  // Restock a product
  const restockProduct = async (productId, newStock) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Send the restock request to the backend
      const response = await axios.patch(
        "/api/products/restock",
        {
          productId,
          sizes: newStock,
        },
        config
      );

      // Update the products in the context
      const updatedProduct = response.data;
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updateProduct : product
        )
      );
    } catch (error) {
      setError(error.response?.data?.message || "Failed to restock product");
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const deleteProduct = async (productId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        restockProduct,
        deleteProduct,
        fetchProducts,
      }}
    >
      {children}
    </AdminProductContext.Provider>
  );
};

export default AdminProductContext;
