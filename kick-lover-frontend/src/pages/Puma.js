import React, { useEffect } from "react";
import SneakerCard from "../components/SneakerCard";
import { useProductContext } from "../context/ProductContext";

const Puma = () => {
  const { products, fetchProductsByBrand, loading } = useProductContext();

  useEffect(() => {
    fetchProductsByBrand("Puma");
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
    <div className="container mx-auto min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Puma Sneakers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <SneakerCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Puma;
