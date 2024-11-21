import React, { useContext, useState } from "react";
import { AddressContext } from "../context/AddressContext";
import SearchFilter from "../components/SearchFilter";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useSidebar } from "../context/SidebarContext";
import Skeleton from "../components/Skeleton";

const AddAddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    street: "",
    postcode: "",
    state: "",
    country: "",
    lat: 0,
    lon: 0,
    phone: "",
    customer_number: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      lat: parseFloat(formData.lat),
      lon: parseFloat(formData.lon),
      customer_number: parseInt(formData.customer_number),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-7 md:px-0">
      <div className="bg-white p-8 rounded-lg max-w-1/2 mx-auto">
        <h2 className="text-2xl font-bold mb-6">Add New Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
          </div>
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              value={formData.postcode}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
          </div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <div>
            <label htmlFor="lat">Customer Number</label>
            <input
              type="number"
              name="customer_number"
              placeholder="Customer Number"
              value={formData.customer_number}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  customer_number: parseInt(e.target.value, 10),
                }));
              }}
              required
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lat">Latitude</label>
            <input
              type="number"
              name="lat"
              step="0.000001"
              placeholder="Latitude"
              value={formData.lat}
              onChange={handleChange}
              className="border p-2 rounded mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lon">Longitude</label>

            <input
              type="number"
              name="lon"
              step="0.000001"
              placeholder="Longitude"
              value={formData.lon}
              onChange={handleChange}
              className="border p-2 rounded mt-1"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
