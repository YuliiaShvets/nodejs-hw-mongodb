import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

import {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContactById
} from "../services/contacts.js";

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  

  const contacts = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId, req.user._id);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
};

export const addContactController = async (req, res) => {
  const data = await addContact({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data,
  });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.user._id, req.body);

    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: "Successfully patched a contact!",
      data: result,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const data = await deleteContactById(contactId, req.user._id);

    if (!data) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
};
