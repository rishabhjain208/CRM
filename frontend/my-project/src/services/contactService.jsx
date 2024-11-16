import axios from "axios";

const apiUrl = "http://localhost:3000/contacts";

export const getContacts = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};
