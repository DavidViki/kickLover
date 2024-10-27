import React from "react";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import NewStoreOpening from "../components/Home/NewStoreOpening";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-6xl font-bold text-center text-blue-500">
        Welcome to Kick Lover!
      </h1>
      <FeaturedProducts />
      <NewStoreOpening />
    </div>
  );
};

export default Home;
