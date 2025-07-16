import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import Joi from "joi";
import { dbTableName } from "../utils/constants.js";

const contactSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    isMark: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const contactModel = model(dbTableName.CONTACT, contactSchema);

export const contactValidation = Joi.object({
    fname: Joi.string().required().messages({
        "string.base": "First name must be a string",
        "string.empty": "First name is required",
        "any.required": "First name is required",
    }),
    lname: Joi.string().required().messages({
        "string.base": "Last name must be a string",
        "string.empty": "Last name is required",
        "any.required": "Last name is required",
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.email": "Email must be a valid email address",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),
    mobile: Joi.string().required().messages({
        "string.base": "Mobile number must be a string",
        "string.empty": "Mobile number is required",
        "string.pattern.base": "Mobile number must be a valid 10-digit Indian number starting with 6-9",
        "any.required": "Mobile number is required",
    }),
    type: Joi.string().required().messages({
        "string.base": "Type must be a string",
        "string.empty": "Type is required",
        "any.required": "Type is required",
    }),
    message: Joi.string().required().messages({
        "string.base": "Message must be a string",
        "string.empty": "Message is required",
        "any.required": "Message is required",
    }),
});

// Joi validation for ID
export const idValidation = Joi.object({
    id: Joi.string().length(24).required().messages({
        "string.length": "ID must be 24 characters",
        "string.base": "ID must be a string",
        "any.required": "ID is required",
    })
});

const subscribeUserSchema = new Schema({
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true },
},
    { timestamps: true }
);
export const subscribeUserModel = model(dbTableName.SUBSCRIBE, subscribeUserSchema);

export const subscribeUserValidation = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required.',
        'string.email': 'Invalid email format.'
    }),
});
