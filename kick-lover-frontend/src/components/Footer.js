import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    {
      icon: FaFacebook,
      link: "https://facebook.com",
    },
    {
      icon: FaTwitter,
      link: "https://twitter.com",
    },
    {
      icon: FaInstagram,
      link: "https://instagram.com",
    },
    {
      icon: FaLinkedin,
      link: "https://linkedin.com",
    },
  ];

  return (
    <footer className="bg-gray-100 text-gray-800 py-8 dark:bg-gray-900 dark:text-gray-300">
      <div className="max-w-6xl mx-auto px-4 md:flex md:justify-between md:items-start">
        {/* Logo and Description */}
        <div className="mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold dark:text-white">Kick Lover</h2>
          <p className="text-gray-400 mt-2">
            Your ultimate sneaker destination.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-lg font-semibold dark:text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {["About Us", "Contact", "FAQ"].map((link, index) => (
              <li key={index}>
                <motion.a
                  href={`/${link.replace(" ", "").toLowerCase()}`}
                  className="hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-lg font-semibold dark:text-white mb-3">
            Contact Us
          </h3>
          <p>Email: support@kicklover.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Sneaker St, Sneakerville, ST 12345</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold dark:text-white mb-3">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, link }, index) => (
              <motion.a
                key={index}
                href={link}
                target="_blank" // Open link in a new tab
                rel="noopener noreferrer" // Security feature
                className="text-gray-900 dark:text-gray-300 transition-colors hover:text-blue-600 dark:hover:text-blue-500"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Kick Lover. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
