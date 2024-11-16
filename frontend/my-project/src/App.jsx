import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactTable from "./components/ContactTable";
import { getContacts } from "./services/contactService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <ContactForm
        fetchContacts={fetchContacts}
        editingContact={editingContact}
        setEditingContact={setEditingContact}
      />
      <ContactTable
        contacts={contacts}
        fetchContacts={fetchContacts}
        setEditingContact={setEditingContact}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
