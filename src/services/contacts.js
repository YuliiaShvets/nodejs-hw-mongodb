import ContactCollection from "../db/models/contacts.js";

export const getContacts = () => ContactCollection.find();

export const getContactById = (contactId) => ContactCollection.findById(contactId);

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async (contactId, payload) => {
  const data = await ContactCollection.findByIdAndUpdate(contactId, payload, {new: true,});
  return data;
  };

export const deleteContactById = contactId => ContactCollection.findByIdAndDelete(contactId);