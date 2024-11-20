import React, { createContext, useState, useContext } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
