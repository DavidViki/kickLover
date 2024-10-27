import React, { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import SneakerCard from "../SneakerCard";
import { motion } from "framer-motion";
import Slider from "react-slick";

const FeaturedProducts = () => {
  const { fetchFeaturedProducts, products, loading } = useProductContext();

  // Fetch products when the component mounts
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
        Featured Products
      </h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id} className="p-4">
            <SneakerCard key={product._id} product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedProducts;
