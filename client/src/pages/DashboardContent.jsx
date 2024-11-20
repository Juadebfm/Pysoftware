import React, { useContext } from "react";
import { AddressContext } from "../context/AddressContext";
import SearchFilter from "../components/SearchFilter";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

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
    editAddress,
    deleteAddress,
  } = useContext(AddressContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="pl-64">
      <SearchFilter />

      <h1 className="capitalize font-bold text-3xl mb-10">Addresses</h1>
      <table className="w-full text-sm text-left rtl:text-right text-dark_text dark:text-gray-400">
        <thead className="text-sm font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-4 py-3">First Name</th>
            <th className="px-4 py-3">Last Name</th>
            <th className="px-4 py-3">Street</th>
            <th className="px-4 py-3">Postcode</th>
            <th className="px-4 py-3">State</th>
            <th className="px-4 py-3">Country</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAddresses.map((address) => (
            <tr
              key={address._id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-4 py-3">{address.first_name}</td>
              <td className="px-4 py-3">{address.last_name}</td>
              <td className="px-4 py-3">{address.street}</td>
              <td className="px-4 py-3">{address.postcode}</td>
              <td className="px-4 py-3">{address.state}</td>
              <td className="px-4 py-3">{address.country}</td>
              <td className="px-4 py-3">{address.phone}</td>
              <td className="px-4 py-3 flex items-center justify-start gap-5 text-2xl">
                <button
                  onClick={() =>
                    editAddress(address._id, { first_name: "New Name" })
                  }
                >
                  <CiEdit />
                </button>
                <button onClick={() => deleteAddress(address._id)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fixed bottom-14 right-14 flex items-center justify-start gap-5">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </div>
        <span className="text-[10px] font-bold">
          {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default DashboardContent;
