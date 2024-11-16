import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ContactTable = ({ contacts, fetchContacts, setEditingContact }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(5); // Number of contacts per page
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Sorting logic
  const sortedContacts = [...contacts].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = sortedContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/contacts/${id}`);
      fetchContacts(); // Refresh the contact list
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact); // Set the selected contact for editing
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full table-auto border-collapse shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-100 text-left">
            <th
              className="px-6 py-4 border-b text-sm font-semibold cursor-pointer"
              onClick={() => handleSort("firstName")}
            >
              First Name
            </th>
            <th
              className="px-6 py-4 border-b text-sm font-semibold cursor-pointer"
              onClick={() => handleSort("lastName")}
            >
              Last Name
            </th>
            <th
              className="px-6 py-4 border-b text-sm font-semibold cursor-pointer"
              onClick={() => handleSort("email")}
            >
              Email
            </th>
            <th
              className="px-6 py-4 border-b text-sm font-semibold cursor-pointer"
              onClick={() => handleSort("phone")}
            >
              Phone
            </th>
            <th
              className="px-6 py-4 border-b text-sm font-semibold cursor-pointer"
              onClick={() => handleSort("company")}
            >
              Company
            </th>
            <th
              className="px-6 py-4 border-b text-sm font-semibold cursor-pointer"
              onClick={() => handleSort("jobTitle")}
            >
              Job Title
            </th>
            <th className="px-6 py-4 border-b text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map((contact) => (
            <tr key={contact._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b">{contact.firstName}</td>
              <td className="px-6 py-4 border-b">{contact.lastName}</td>
              <td className="px-6 py-4 border-b">{contact.email}</td>
              <td className="px-6 py-4 border-b">{contact.phone}</td>
              <td className="px-6 py-4 border-b">{contact.company}</td>
              <td className="px-6 py-4 border-b">{contact.jobTitle}</td>
              <td className="px-6 py-4 border-b space-x-2">
                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={() => handleEdit(contact)} // Trigger edit mode
                    className="px-4 py-2 text-blue-500 hover:text-blue-700 bg-blue-100 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="px-4 py-2 text-red-500 hover:text-red-700 bg-red-100 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {Math.ceil(contacts.length / contactsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(contacts.length / contactsPerPage)
          }
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContactTable;
