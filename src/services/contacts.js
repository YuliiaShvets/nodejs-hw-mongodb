import ContactCollection from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from '../constants/index.js';


export const getContacts = async ({
  page = 1,
  perPage = 4,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();
  contactsQuery.where('userId').equals(userId);

  if (filter.isFavorite) {
    contactsQuery.where('isFavorite').equals(filter.isFavorite);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  
  const [contactsCount, contacts] = await Promise.all([
    ContactCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (contactId, userId) => ContactCollection.findOne({ _id: contactId, userId });

export const addContact = payload => ContactCollection.create(payload);

export const updateContact = async (contactId, userId, updateData) => {
  const updatedContact = await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    updateData,
    { new: true }
  );
  return updatedContact;
  };

  export const deleteContactById = async (contactId, userId) => {
    const deletedContact = await ContactCollection.findOneAndDelete({ _id: contactId, userId });
   return deletedContact;
  };
