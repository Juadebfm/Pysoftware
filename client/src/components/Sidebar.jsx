import React, { useState, useEffect } from "react";
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
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const { isExpanded, toggleSidebar: contextToggleSidebar } = useSidebar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { menuItems, isLoading, error } = useMenu();

  // State to track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogoClick = () => {
    if (windowWidth >= 768) {
      contextToggleSidebar();
    }
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
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
          onClick={handleNavLinkClick}
          className={({ isActive }) =>
            `flex items-center justify-start rounded-xl transition-all duration-200 my-1 px-3 py-4
            ${
              isActive
                ? "bg-accent_color text-white font-bold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          <IconComponent className="w-6 h-6 shrink-0" />
          <span
            className={`ml-4 transition-all duration-200 
              ${
                isExpanded || windowWidth < 768
                  ? "opacity-100 inline"
                  : "opacity-0 hidden"
              }`}
          >
            {item.menu_item}
          </span>
        </NavLink>
      );
    });
  };

  return (
    <>
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-300 z-50
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}  
          md:static md:translate-x-0
          ${isExpanded ? "md:w-60 px-4" : "md:w-20 px-2"}                      
          w-60                                                       
        `}
      >
        <div
          className={`flex items-center cursor-pointer py-6 px-4`}
          onClick={handleLogoClick}
        >
          <HiAcademicCap className="w-8 h-8 text-accent_color shrink-0" />
          <span
            className={`ml-4 font-bold text-xl transition-all duration-200
              ${
                isExpanded || windowWidth < 768
                  ? "opacity-100 inline"
                  : "opacity-0 hidden"
              }`}
          >
            PySoftware
          </span>
        </div>

        <nav className="mt-8">{renderNavLinks()}</nav>
      </aside>
    </>
  );
};

export default Sidebar;
