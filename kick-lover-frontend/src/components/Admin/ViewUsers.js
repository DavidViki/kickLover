import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../Modal";
import { motion } from "framer-motion";

const ViewUsers = () => {
  const { fetchAllUsers, loading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "success" or "error"
  const [modalMessage, setModalMessage] = useState("");

  // Fetch all users when component mounts
  useEffect(() => {
    try {
      const fetchUsers = async () => {
        setUsers(await fetchAllUsers());
      };
      fetchUsers();
    } catch (error) {
      // Show error modal
      setModalType("error");
      setModalMessage(error.message || "Error fetching users");
      setIsModalOpen(true);
    }
  }, []);

  // Display loading spinner if data is being fetched
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Users
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-fixed divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700 top-0 z-10">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                User ID
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                Username
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                Email
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                Admin
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-white dark:bg-gray-600 sm:table-row block sm:flex"
              >
                <td className="px-2 py-4 text-sm text-gray-500 dark:text-gray-300 sm:table-cell block sm:flex items-center">
                  <span className="sm:hidden font-semibold text-gray-600 dark:text-gray-300">
                    User ID:
                  </span>
                  {user._id}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500 dark:text-gray-300 sm:table-cell block sm:flex items-center">
                  <span className="sm:hidden font-semibold text-gray-600 dark:text-gray-300">
                    Username:
                  </span>
                  {user.username}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500 dark:text-gray-300 sm:table-cell block sm:flex items-center">
                  <span className="sm:hidden font-semibold text-gray-600 dark:text-gray-300">
                    Email:
                  </span>
                  {user.email}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500 dark:text-gray-300 sm:table-cell block sm:flex items-center">
                  <span className="sm:hidden font-semibold text-gray-600 dark:text-gray-300">
                    Admin:
                  </span>
                  {user.isAdmin ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for error */}
      <Modal
        isOpen={isModalOpen}
        type={modalType}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)} // Close modal handler
      />
    </motion.div>
  );
};

export default ViewUsers;
