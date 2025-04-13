import { Router} from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getContactsController, 
         getContactByIdController, 
         addContactController,
         patchContactController,
         deleteContactController } from "../controllers/contacts.js";
import { validateBody } from "../utils/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewres/isValidId.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getContactsController));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post("/", validateBody(createContactSchema), ctrlWrapper(addContactController));

contactsRouter.patch("/:contactId", isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

contactsRouter.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));


export default contactsRouter;