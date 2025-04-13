import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(true),
    phoneNumber: Joi.string().min(3).max(20).required(true), 
    email: Joi.string().email().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid("work", "home", "personal").required(true).default("personal"),
}
    );

export const updateContactSchema = Joi.object({
        name: Joi.string().min(3).max(20),
        phoneNumber: Joi.string().min(3).max(20), 
        email: Joi.string().email().min(3).max(20),
        isFavourite: Joi.boolean(),
        contactType: Joi.string().valid("work", "home", "personal").default("personal"),
    }
        );
