import React, { createContext, useState, useEffect } from "react";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]); // Full dataset
  const [paginatedAddresses, setPaginatedAddresses] = useState([]); // Current page's data
  const [currentPage, setCurrentPage] = useState(1); // Active page
  const [recordsPerPage] = useState(2); // Number of records per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/addresses", {
          headers: {
            "X-API-KEY": import.meta.env.VITE_API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setAddresses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    // Update paginated addresses whenever `addresses` or `currentPage` changes
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    setPaginatedAddresses(addresses.slice(startIndex, endIndex));
  }, [addresses, currentPage, recordsPerPage]);

  // Functions to navigate between pages
  const nextPage = () => {
    if (currentPage < Math.ceil(addresses.length / recordsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const setPage = (page) => {
    if (page >= 1 && page <= Math.ceil(addresses.length / recordsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses, // Full dataset
        paginatedAddresses, // Addresses for the current page
        currentPage,
        recordsPerPage,
        totalPages: Math.ceil(addresses.length / recordsPerPage),
        loading,
        error,
        nextPage,
        previousPage,
        setPage,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
