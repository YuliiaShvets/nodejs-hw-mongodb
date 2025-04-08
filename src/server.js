import express from "express";
import cors from "cors";
import { logger } from "./middlewres/logger.js";
import { notFoundHandler } from "./middlewres/notFoundHandler.js";
import { errorHandler } from "./middlewres/errorHandler.js";
import contactsRouter from "./routers/contacts.js";
import { getEnvVar } from "./utils/getEnvVar.js";



export const setupServer = () => {
  const app = express();
app.use(cors());
app.use(express.json());

app.use(logger);

app.use("/contacts", contactsRouter); 

app.use(errorHandler);
app.use(notFoundHandler);



const port = Number(getEnvVar("PORT", 3000));


app.listen(port, () => console.log(`Server is running on port ${port}`));
};