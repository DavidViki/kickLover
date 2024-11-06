import React, { useState } from "react";
import { motion } from "framer-motion";
import AddProduct from "../components/Admin/AddProduct";
import UpdateProduct from "../components/Admin/UpdateProduct";
import RestockProduct from "../components/Admin/RestockProduct";
import DeleteProduct from "../components/Admin/DeleteProduct";
import ViewOrders from "../components/Admin/ViewOrders";
import UpdateOrderStatus from "../components/Admin/UpdateOrderStatus";
import CancelOrders from "../components/Admin/CancelOrders";
import DeleteOrders from "../components/Admin/DeleteOrders";
import ViewUsers from "../components/Admin/ViewUsers";
import DeleteUsers from "../components/Admin/DeleteUser";

// Admin Dashboard Component
const Admin = () => {
  const [activeOption, setActiveOption] = useState("products");
  const [subOption, setSubOption] = useState("add");

  // Sidebar Options
  const sidebarOptions = [
    { name: "Products", value: "products" },
    { name: "Orders", value: "orders" },
    { name: "Users", value: "users" },
  ];

  // Sub-options for the selected main option
  const subOptions = {
    products: [
      "Add Product",
      "Update Product",
      "Restock Product",
      "Delete Product",
    ],
    orders: [
      "View Orders",
      "Update Order Status",
      "Cancel Orders",
      "Delete Orders",
    ],
    users: ["View Users", "Delete Users"],
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-6"
      >
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav>
          {sidebarOptions.map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveOption(option.value)}
              className={`p-3 mb-2 cursor-pointer rounded-lg ${
                activeOption === option.value
                  ? "dark:bg-indigo-600  bg-indigo-400"
                  : "dark:bg-gray-800 bg-gray-300"
              }`}
            >
              {option.name}
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Taskbar */}
        <motion.header
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white p-4 flex justify-between items-center"
        >
          <div className="text-xl">Welcome, Admin!</div>
        </motion.header>

        {/* Main Bar & Secondary Bar */}
        <div className="flex flex-1">
          {/* Main Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 bg-white dark:bg-gray-800 p-6 border-r border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              Manage {activeOption}
            </h3>
            {subOptions[activeOption].map((subOptionText) => (
              <motion.div
                key={subOptionText}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSubOption(subOptionText)}
                className={`p-3 mb-2 cursor-pointer dark:text-white rounded-lg ${
                  subOption === subOptionText
                    ? "dark:bg-indigo-600 bg-indigo-400"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {subOptionText}
              </motion.div>
            ))}
          </motion.div>

          {/* Secondary Bar (Main content display based on selected option) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 p-6"
          >
            <div className="mt-4">
              {/* Render content based on selected sub-option */}
              {activeOption === "products" && (
                <div>
                  {/* Show Product-related forms/components */}
                  {subOption === "Add Product" && (
                    <div>
                      <AddProduct />
                    </div>
                  )}
                  {subOption === "Update Product" && (
                    <div>
                      <UpdateProduct />
                    </div>
                  )}
                  {subOption === "Restock Product" && (
                    <div>
                      <RestockProduct />
                    </div>
                  )}
                  {subOption === "Delete Product" && (
                    <div>
                      <DeleteProduct />
                    </div>
                  )}
                </div>
              )}

              {activeOption === "orders" && (
                <div>
                  {/* Show Orders-related components */}
                  {subOption === "View Orders" && (
                    <div>
                      <ViewOrders />
                    </div>
                  )}
                  {subOption === "Update Order Status" && (
                    <div>
                      <UpdateOrderStatus />
                    </div>
                  )}
                  {subOption === "Cancel Orders" && (
                    <div>
                      <CancelOrders />
                    </div>
                  )}
                  {subOption === "Delete Orders" && (
                    <div>
                      <DeleteOrders />
                    </div>
                  )}
                </div>
              )}

              {activeOption === "users" && (
                <div>
                  {/* Show Users-related components */}
                  {subOption === "View Users" && (
                    <div>
                      <ViewUsers />
                    </div>
                  )}
                  {subOption === "Delete Users" && (
                    <div>
                      <DeleteUsers />
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
