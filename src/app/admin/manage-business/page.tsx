"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import ViewDialog from "./_components/ViewDialog";

type Props = {};

interface Business {
  _id: string; // Add _id for proper identification
  businessName: string;
  domain: string;
  businessEmail: string;
  status: string;
}

const ManageBusiness = (props: Props) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [businessToDelete, setBusinessToDelete] = useState<Business | null>(
    null
  ); // For delete confirmation

  // Fetch businesses from the API
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch(
          "http://popula-backend-efc1.onrender.com/api/business/all",
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setBusinesses(data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    fetchBusinesses();
  }, []);

  const handleViewClick = (business: Business) => {
    setSelectedBusiness(business);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleEditClick = (business: Business) => {
    setEditingBusiness(business);
    setNewStatus(business.status);
  };

  const handleSaveStatus = async () => {
    if (editingBusiness) {
      const updatedBusinesses = businesses.map((b) =>
        b.businessName === editingBusiness.businessName
          ? { ...b, status: newStatus }
          : b
      );

      setBusinesses(updatedBusinesses);
      setEditingBusiness(null);

      // Send API request to update the business status
      try {
        const response = await fetch(
          `http://popula-backend-efc1.onrender.com/api/business/${editingBusiness._id}`, // Use the business ID here
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update status");
        }

        const updatedBusiness = await response.json();

        // Update the local state with the server's response
        setBusinesses((prevBusinesses) =>
          prevBusinesses.map((b) =>
            b._id === updatedBusiness._id ? updatedBusiness : b
          )
        );
      } catch (error) {
        console.error("Error updating business status:", error);
      }
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (business: Business) => {
    setBusinessToDelete(business); // Set the business to be deleted
  };

  const confirmDelete = async () => {
    if (businessToDelete) {
      try {
        const response = await fetch(
          `http://popula-backend-efc1.onrender.com/api/business/${businessToDelete._id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete business");
        }

        // Remove the business from the state
        setBusinesses((prevBusinesses) =>
          prevBusinesses.filter((b) => b._id !== businessToDelete._id)
        );
        setBusinessToDelete(null); // Reset the delete state
      } catch (error) {
        console.error("Error deleting business:", error);
      }
    }
  };

  const cancelDelete = () => {
    setBusinessToDelete(null); // Reset delete state if canceled
  };

  return (
    <div className="p-6 max-h-screen space-y-4 w-full overflow-y-scroll">
      <Navbar title="Admin" description={"Manage Business"} />
      <div>
        <h2 className="text-2xl font-semibold mb-4">Business List</h2>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm text-gray-700">
                <th className="px-4 py-2 border-b">Business Name</th>
                <th className="px-4 py-2 border-b">Domain</th>
                <th className="px-4 py-2 border-b">Business Email</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((business) => (
                <tr key={business._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    {business.businessName}
                  </td>
                  <td className="px-4 py-2 border-b">{business.domain}</td>
                  <td className="px-4 py-2 border-b">
                    {business.businessEmail}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {editingBusiness?.businessName === business.businessName ? (
                      <div className="flex items-center space-x-2">
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="Hold">Hold</option>
                          <option value="Active">Active</option>
                          <option value="Blacklist">Blacklist</option>
                        </select>
                        <button
                          onClick={handleSaveStatus}
                          className="px-2 py-1 bg-blue-500 text-white rounded"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      business.status
                    )}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleViewClick(business)}
                      className="text-blue-500 mx-2"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEditClick(business)}
                      className="text-yellow-500 mx-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(business)}
                      className="text-red-500 mx-2"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ViewDialog modal */}
      {selectedBusiness && (
        <ViewDialog
          business={selectedBusiness}
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
        />
      )}

      {/* Delete Confirmation Modal */}
      {businessToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold">
              Are you sure you want to delete this business?
            </h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBusiness;
