import React, { useState } from "react";
import Logo from "./Logo";
import CentralLinks from "./CentralLinks";
import AuthLinks from "./AuthLinks";
import ToggleSwitch from "./ToggleSwitch";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      setMobileMenuOpen(false); // Close mobile menu when a link is clicked
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-150 dark:bg-gray-800 shadow-md">
      <Logo />

      {/* Central Links - Centered on Desktop */}
      <div className="flex-1 hidden md:flex justify-center">
        <CentralLinks />
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden text-gray-700 dark:text-gray-200"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Auth Links and Toggle Switch - Aligned to the right on Desktop */}
      <div className="hidden md:flex items-center space-x-4">
        <AuthLinks />
        <ToggleSwitch />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-10">
          <div className="flex flex-col items-center space-y-4 py-4">
            <CentralLinks handleClick={handleLinkClick} />
            <AuthLinks handleClick={handleLinkClick} />
            <ToggleSwitch />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
