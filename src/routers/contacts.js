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
import { authenticate } from '../middlewres/authenticate.js';

const router = Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getContactsController));

router.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

router.post("/", validateBody(createContactSchema), ctrlWrapper(addContactController));

router.patch("/:contactId", isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));


export default router;