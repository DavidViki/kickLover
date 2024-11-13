import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../Modal";
import { motion } from "framer-motion";

const DeleteUsers = () => {
  const { fetchAllUsers, deleteUser, loading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // Fetch all users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await fetchAllUsers();
        // Filter users to only show non-admins
        const filteredUsers = usersData.filter((user) => !user.isAdmin);
        setUsers(filteredUsers);
      } catch (error) {
        // Show error Modal
        setModalType("error");
        setModalMessage(error.message || "Error fetching users");
        setIsModalOpen(true);
      }
    };
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId)); // Update state to remove deleted user

      // Show success modal
      setModalType("success");
      setModalMessage("User deleted!");
      setIsModalOpen(true);
    } catch (error) {
      // Show error modal
      setModalType("error");
      setModalMessage(error.message || "Error deleting user");
      setIsModalOpen(true);
    }
  };

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
        Delete Users
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
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-white dark:bg-gray-600 sm:table-row block sm:flex"
              >
                <td className="px-2 py-4 text-sm text-gray-500 dark:text-gray-300 sm:table-cell block sm:flex items-center break-words">
                  <span className="sm:hidden font-semibold text-gray-600 dark:text-gray-300">
                    User ID:
                  </span>
                  {user._id}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500 dark:text-gray-300 sm:table-cell block sm:flex items-center break-words">
                  <span className="sm:hidden font-semibold text-gray-600 dark:text-gray-300">
                    Username:
                  </span>
                  {user.username}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500 dark:text-gray-300 sm:table-cell block sm:flex items-center break-words">
                  <span className="sm:hidden font-semibold text-gray-600 dark:text-gray-300">
                    Email:
                  </span>
                  {user.email}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500 dark:text-gray-300 sm:table-cell block sm:flex items-center break-words">
                  <span className="sm:hidden font-semibold text-gray-600 dark:text-gray-300">
                    Action:
                  </span>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for error/success */}
      <Modal
        isOpen={isModalOpen}
        type={modalType}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)} // Close modal handler
      />
    </motion.div>
  );
};

export default DeleteUsers;
