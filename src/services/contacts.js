import ContactCollection from "../db/models/contacts.js";

export const getContacts = () => ContactCollection.find();

export const getContactsById = async (contactId) => {
    return await ContactCollection.findById(contactId);
  };