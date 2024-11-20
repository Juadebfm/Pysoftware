import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiAcademicCap,
  HiMenuAlt2,
  HiX,
  HiHome,
  HiUserGroup,
  HiLogin,
  HiUserCircle,
  HiCurrencyDollar,
  HiUserAdd,
  HiPhone,
  HiQuestionMarkCircle,
  HiInformationCircle,
} from "react-icons/hi";
import { useMenu } from "../context/MenuContext";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { menuItems, isLoading, error } = useMenu();

  const MENU_ICONS = {
    Home: HiHome,
    Student: HiUserGroup,
    Login: HiLogin,
    Tutor: HiUserCircle,
    Pricing: HiCurrencyDollar,
    "Sign-up": HiUserAdd,
    Contact: HiPhone,
    Help: HiQuestionMarkCircle,
    About: HiInformationCircle,
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderNavLinks = () => {
    if (isLoading) {
      return <div className="px-4 py-4">Loading menu items...</div>;
    }

    if (error) {
      return <div className="px-4 py-4 text-red-500">Error: {error}</div>;
    }

    return menuItems.map((item) => {
      const IconComponent = MENU_ICONS[item.menu_item] || HiAcademicCap;

      return (
        <NavLink
          key={item.id}
          to={item.href}
          className={({ isActive }) =>
            `flex items-center justify-start rounded-xl transition-all duration-200 my-1 
            ${isExpanded ? "px-4" : "px-0 justify-center"} py-3
            ${
              isActive
                ? "bg-accent_color text-white font-bold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          <IconComponent
            className={`w-6 h-6 shrink-0 transition-all duration-200 
            ${!isExpanded && "mx-auto"}`}
          />
          <span
            className={`ml-4 transition-all duration-200 
            ${isExpanded ? "opacity-100 inline" : "opacity-0 w-0 hidden"}`}
          >
            {item.menu_item}
          </span>
        </NavLink>
      );
    });
  };

  return (
    <>
      {/* Mobile Menu Button - Now positioned on the right */}
      <button
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-lg md:hidden"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <HiX className="w-6 h-6" />
        ) : (
          <HiMenuAlt2 className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-300 z-40
          ${isExpanded ? "w-60 px-4" : "w-20 px-4"} 
          md:translate-x-0
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Logo Section */}
        <div
          className={`flex items-center cursor-pointer py-6 
          ${isExpanded ? "px-4" : "px-0 justify-center"}`}
          onClick={toggleSidebar}
        >
          <HiAcademicCap className="w-8 h-8 text-accent_color shrink-0" />
          <span
            className={`ml-4 font-bold text-xl transition-all duration-200
              ${isExpanded ? "opacity-100 inline" : "opacity-0 hidden"}`}
          >
            PySoftware
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8">{renderNavLinks()}</nav>
      </aside>
    </>
  );
};

export default Sidebar;
