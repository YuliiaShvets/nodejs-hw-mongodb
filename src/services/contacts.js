import ContactCollection from "../db/models/contacts.js";

export const getContacts = () => ContactCollection.find();

export const getContactById = async (contactId) => {
    return await ContactCollection.findById(contactId);
  };

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async (contactId, payload, options = {}) => {
  const { upsert } = options;

  const rawResult = await ContactCollection.findByIdAndUpdate(contactId, payload, {
    new: true,
    upsert,
    rawResult: true,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject?.upserted),
  };
};

export const deleteContactById = contactId => ContactCollection.findOneAndDelete(contactId);