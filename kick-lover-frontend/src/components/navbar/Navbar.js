import React, { useState } from "react";
import Logo from "./Logo";
import CentralLinks from "./CentralLinks";
import AuthLinks from "./AuthLinks";
import ToggleSwitch from "./ToggleSwitch";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-150 dark:bg-gray-800 shadow-md">
      <Logo />

      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden text-gray-700 dark:text-gray-200"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Central Links & Auth Links - Hidden on Mobile */}
      <div className="hidden md:flex items-center space-x-4">
        <CentralLinks />
        <AuthLinks />
        <ToggleSwitch />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-10">
          <div className="flex flex-col items-center space-y-4 py-4">
            <CentralLinks />
            <AuthLinks />
            <ToggleSwitch />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
