import React, { useContext } from "react";
import { AddressContext } from "../context/AddressContext";

const SearchFilter = () => {
  const { searchQuery, setSearchQuery } = useContext(AddressContext);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="max-w-[500px]">
      <input
        type="text"
        placeholder="Search by name, street, state, customer number, etc."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.trim())}
        className="border border-gray-300 rounded p-2 w-full mb-5"
        pattern="[a-zA-Z0-9\s]*"
      />
    </div>
  );
};

export default SearchFilter;
