import React from "react";
import Logo from "./Logo";
import CentralLinks from "./CentralLinks";
import AuthLinks from "./AuthLinks";
import ToggleSwitch from "./ToggleSwitch";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-150 dark:bg-gray-800 shadow-md">
      <Logo />
      <CentralLinks />
      <div className="flex items-center space-x-4">
        <AuthLinks />
        <ToggleSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
