import express from "express";
import cors from "cors";
import PinoHttp from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";
import { getContacts, getContactsById } from "./services/contacts.js";

export const setupServer = () => {

const app = express();

app.use(cors());

app.use(express.json());

const logger = PinoHttp({
    transport: {
        target: "pino-pretty"
    }
});
app.use(logger);

app.get("/contacts", async (req, res) => {
    const data = await getContacts();
    res.json({
            status: 200,
            message: "Successfully found contacts!",
            data,
          });
});

app.get("/contacts/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.use((req, res) => {
    res.status(404).json({
        message: "Not found",
    });
});

const port = Number(getEnvVar("PORT", 3000));


app.listen(port, () => console.log(`Server is running on port ${port}`));
};