import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <p className="text-lg text-center max-w-2xl mx-auto mb-10">
          Got questions or feedback? Reach out to us through the form below or
          contact us directly.
        </p>

        <div className="flex flex-col md:flex-row gap-12 justify-center items-start">
          {/* Contact Information */}
          <div className="md:w-1/2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Our Office</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                123 Sneaker Street <br />
                Kick City, SN 45678
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Contact Info</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Phone: (123) 456-7890 <br />
                Email: support@kicklover.com
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            className="md:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="mt-1 w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
