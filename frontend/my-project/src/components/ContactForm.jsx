import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ContactForm = ({ fetchContacts, editingContact, setEditingContact }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    if (editingContact) {
      setFirstName(editingContact.firstName);
      setLastName(editingContact.lastName);
      setEmail(editingContact.email);
      setPhone(editingContact.phone);
      setCompany(editingContact.company);
      setJobTitle(editingContact.jobTitle);
    } else {
      resetForm();
    }
  }, [editingContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
    };

    try {
      if (editingContact) {
        await axios.put(
          `http://localhost:3000/contacts/${editingContact._id}`,
          contactData
        );
        toast.success("Contact updated successfully");
      } else {
        await axios.post("http://localhost:3000/contacts", contactData);
        toast.success("Contact added successfully");
      }
      fetchContacts(); // Refresh the contact list
      resetForm();
      setEditingContact(null); // Clear the editing contact state
    } catch (error) {
      console.error("Error saving contact:", error);
      toast.error("Failed to save contact");
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setJobTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 border bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl mb-6 text-center text-blue-600">
        {editingContact ? "Update Contact" : "Add Contact"}
      </h2>
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone
        </label>
        <input
          id="phone"
          type="text"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <input
          id="company"
          type="text"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="jobTitle"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title
        </label>
        <input
          id="jobTitle"
          type="text"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {editingContact ? "Update" : "Add"} Contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
