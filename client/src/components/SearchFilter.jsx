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
        placeholder="Search by name, street, state, etc."
        value={searchQuery}
        onChange={handleInputChange}
        className="border border-gray-300 rounded p-2 w-full mb-5 placeholder:"
      />
    </div>
  );
};

export default SearchFilter;
