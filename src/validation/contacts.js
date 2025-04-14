import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number must be a text string.',
    'string.min': 'Phone number must be at least {#limit} characters long.',
    'string.max': 'Phone number must not exceed {#limit} characters.',
    'any.required': 'Phone number is required.'
  }),
  email: Joi.string().email().min(3).max(20).required().messages({
    'string.email': 'Please enter a valid email address.',
    'string.min': 'Email must be at least {#limit} characters long.',
    'string.max': 'Email must not exceed {#limit} characters.',
    'any.required': 'Email is required.'
  }),
  isFavourite: Joi.boolean().required().messages({
    'boolean.base': 'isFavourite must be a boolean value (true or false).',
    'any.required': 'isFavourite is required.'
  }),
  contactType: Joi.string().valid("work", "home", "personal").required().default("personal").messages({
    'string.base': 'contactType must be a string.',
    'any.only': 'contactType must be one of: work, home, or personal.',
    'any.required': 'contactType is required.'
  })
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Name should be a string',
        'string.min': 'Name should have at least {#limit} characters',
        'string.max': 'Name should have at most {#limit} characters',
      }),
    phoneNumber: Joi.string().min(3).max(20).messages({
        'string.base': 'Phone number must be a text string.',
        'string.min': 'Phone number must be at least {#limit} characters long.',
        'string.max': 'Phone number must not exceed {#limit} characters.',
      }),
      email: Joi.string().email().min(3).max(20).messages({
        'string.email': 'Please enter a valid email address.',
        'string.min': 'Email must be at least {#limit} characters long.',
        'string.max': 'Email must not exceed {#limit} characters.',
      }),
    isFavourite: Joi.boolean().messages({
        'boolean.base': 'isFavourite must be a boolean value (true or false).',
      }),
      contactType: Joi.string().valid("work", "home", "personal").messages({
        'string.base': 'contactType must be a string.',
        'any.only': 'contactType must be one of: work, home, or personal.',
    })
}
    );