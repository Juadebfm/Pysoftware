// contexts/MenuContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/menu", {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY, // Make sure to create a .env file with this
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch menu items: ${response.status}`);
        }

        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching menu items:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <MenuContext.Provider value={{ menuItems, isLoading, error }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
