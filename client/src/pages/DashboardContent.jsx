import React, { useContext } from "react";
import { AddressContext } from "../context/AddressContext";

const DashboardContent = () => {
  const {
    paginatedAddresses,
    currentPage,
    totalPages,
    loading,
    error,
    nextPage,
    previousPage,
    setPage,
  } = useContext(AddressContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="pl-64">
      <h1>
        Addresses (Page {currentPage} of {totalPages})
      </h1>
      <ul>
        {paginatedAddresses.map((address) => (
          <li key={address._id}>
            <p>
              <strong>
                {address.first_name} {address.last_name}
              </strong>
              <br />
              {address.street}, {address.state}, {address.country}
              <br />
              <em>{address.postcode}</em>
            </p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        <span>
          Jump to page:
          <input
            type="number"
            value={currentPage}
            onChange={(e) => setPage(Number(e.target.value))}
            min="1"
            max={totalPages}
          />
        </span>
      </div>
    </div>
  );
};

export default DashboardContent;
