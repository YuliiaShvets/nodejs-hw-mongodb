import createHttpError from "http-errors";
import { getContacts, 
         getContactById, 
         addContact, 
         updateContact, 
         deleteContactById } from "../services/contacts.js";

export const getContactsController = async (req, res) => {
    const data = await getContacts();
    res.json({
            status: 200,
            message: "Successfully found contacts!",
            data,
          });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw createHttpError(404, "Contact not found");
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
};

export const addContactController = async(req, res)=> {
  const data = await addContact(req.body);

  res.status(201).json({
    status: 201,
		message: "Successfully created a contact!",
    data,
  });
};


export const patchContactController = async(req, res)=> {
  const {contactId} = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    throw createHttpError(404, "Contact not found");
  }

  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: result.data,
  });
};

export const deleteContactController = async (req, res)=> {
  const { contactId } = req.params;
  const data = await deleteContactById(contactId);

  if (!data) {
    throw createHttpError(404, "Contact not found");
  }

  res.status(204).send();
};