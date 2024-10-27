import React, { useEffect } from "react";
import SneakerCard from "../components/SneakerCard";
import { useProductContext } from "../context/ProductContext";
import { motion } from "framer-motion";

const Nike = () => {
  const { products, fetchProductsByBrand, loading } = useProductContext();

  useEffect(() => {
    fetchProductsByBrand("Nike");
  }, []);

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
      className="container mx-auto min-h-screen p-4 bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Nike Sneakers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <SneakerCard key={product._id} product={product} />
        ))}
      </div>
    </motion.div>
  );
};

export default Nike;
