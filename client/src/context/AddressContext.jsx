import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [paginatedAddresses, setPaginatedAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAddresses, setFilteredAddresses] = useState([]);

  const handleError = (errorResponse) => {
    if (errorResponse.error) {
      // Check if there are validation error details
      if (
        errorResponse.message === "Validation Error" &&
        errorResponse.details
      ) {
        // For validation errors, show each detail's message
        errorResponse.details.forEach((detail) => {
          toast.error(detail.message, {
            position: "top-right",
            duration: 4000,
          });
        });
      } else {
        // For other error types, use the main message
        toast.error(errorResponse.message, {
          position: "top-right",
          duration: 4000,
        });
      }
    } else {
      // Fallback for unexpected error format
      toast.error("An unexpected error occurred", {
        position: "top-right",
        duration: 4000,
      });
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://py-software-backend.vercel.app/api/addresses",
          {
            headers: {
              "X-API-KEY": import.meta.env.VITE_API_KEY,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const responseData = await response.json();

        // Specifically set addresses to the data array
        const fetchedAddresses = responseData.data || [];
        setAddresses(fetchedAddresses);
        setFilteredAddresses(fetchedAddresses);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
        setAddresses([]);
        setFilteredAddresses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;

    const paginated = filteredAddresses.slice(startIndex, endIndex);

    setPaginatedAddresses(paginated);
  }, [filteredAddresses, currentPage, recordsPerPage]);

  useEffect(() => {
    let filtered = addresses; // Default to all addresses

    if (searchQuery.trim() !== "") {
      const isNumeric = !isNaN(searchQuery);

      filtered = addresses.filter((address) => {
        if (isNumeric) {
          return (
            address.customer_number !== undefined &&
            searchQuery === address.customer_number.toString()
          );
        }

        const matchesTextFields = [
          "first_name",
          "last_name",
          "street",
          "postcode",
          "state",
          "country",
          "phone",
        ].some(
          (field) =>
            address[field] &&
            address[field]
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );

        return matchesTextFields;
      });
    }

    setFilteredAddresses(filtered || []); // Ensure filtered is an array
  }, [searchQuery, addresses]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;

    // Add extra safety check
    setPaginatedAddresses(
      Array.isArray(filteredAddresses)
        ? filteredAddresses.slice(startIndex, endIndex)
        : []
    );
  }, [filteredAddresses, currentPage, recordsPerPage]);

  const nextPage = () => {
    const maxPages = Math.ceil(filteredAddresses.length / recordsPerPage);
    if (currentPage < maxPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const setPage = (page) => {
    if (
      page >= 1 &&
      page <= Math.ceil((filteredAddresses?.length || 0) / recordsPerPage)
    ) {
      setCurrentPage(page);
    }
  };

  const editAddress = async (userId, updatedData) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://py-software-backend.vercel.app/api/addresses/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      toast.success("Address updated successfully!", {
        position: "top-right",
        duration: 4000,
      });

      // Refresh the data
      const updatedAddresses = await fetch(
        "https://py-software-backend.vercel.app/api/addresses",
        {
          headers: { "X-API-KEY": import.meta.env.VITE_API_KEY },
        }
      );
      const data = await updatedAddresses.json();
      setAddresses(data.data);
    } catch (err) {
      handleError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://py-software-backend.vercel.app/api/addresses/${userId}`,
        {
          method: "DELETE",
          headers: { "X-API-KEY": import.meta.env.VITE_API_KEY },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      toast.success("Address deleted successfully!", {
        position: "top-right",
        duration: 4000,
      });

      // Remove the deleted address from filteredAddresses
      setFilteredAddresses(
        filteredAddresses.filter((address) => address._id !== userId)
      );

      // Adjust pagination if needed
      const maxPages = Math.ceil(filteredAddresses.length / recordsPerPage);
      if (currentPage > maxPages) {
        setCurrentPage(maxPages); // Move to the last valid page
      }
    } catch (err) {
      handleError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (newAddressData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://py-software-backend.vercel.app/api/addresses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify(newAddressData),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        // Pass the entire error response to handleError
        throw responseData;
      }

      toast.success("Address added successfully!", {
        position: "top-right",
        duration: 4000,
      });

      // Refresh the data
      const updatedAddresses = await fetch(
        "https://py-software-backend.vercel.app/api/addresses",
        {
          headers: { "X-API-KEY": import.meta.env.VITE_API_KEY },
        }
      );
      const data = await updatedAddresses.json();
      setAddresses(data.data);
    } catch (err) {
      // Use the new handleError method
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredAddresses]);

  return (
    <AddressContext.Provider
      value={{
        addAddress,
        addresses,
        paginatedAddresses,
        filteredAddresses,
        currentPage,
        recordsPerPage,
        totalPages: Math.ceil(filteredAddresses.length / recordsPerPage),
        loading,
        error,
        nextPage,
        previousPage,
        setPage,
        searchQuery,
        setSearchQuery,
        editAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
