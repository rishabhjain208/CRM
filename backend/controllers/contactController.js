const Contact = require("../models/contact");

// Create a new contact
module.exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
    });
    await newContact.save();
    return res.status(200).json({
      success: true,
      message: "Contact  created successfully",
      newContact,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all contacts
module.exports.getContacts = async (req, res) => {
  try {
    // Use Contact.find() to retrieve all contacts
    const contacts = await Contact.find();
    return res.status(200).json({
      success: true,
      message: "Contacts retrieved successfully",
      contacts,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update a contact
module.exports.updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      updatedContact,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a contact
module.exports.deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
