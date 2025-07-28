import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import Joi from "joi";
import { dbTableName } from "../utils/constants.js";

const jobApplicationSchema = new Schema({
    fName: { type: String, required: true },
    email: { type: String, required: true },
    expYear: { type: Number, required: true },
    expMonth: { type: Number, required: true },
    currentCTC: { type: Number, required: true },
    expectedCTC: { type: Number, required: true },
    mobile: { type: String, required: true },
    position: { type: String, required: true },
    file: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const jobModel = model(dbTableName.JOB_APPLICATION, jobApplicationSchema);

export const jobApplicationValidation = Joi.object({
    fName: Joi.string().required().messages({
        "string.base": `"fName" must be a string`,
        "any.required": `"fName" is a required field`,
    }),
    email: Joi.string().email().required().messages({
        "string.base": `"email" must be a string`,
        "string.email": `"email" must be a valid email address`,
        "any.required": `"email" is a required field`,
    }),
    expYear: Joi.number().integer().min(0).required().messages({
        "number.base": `"expYear" must be a number`,
        "any.required": `"expYear" is a required field`,
    }),
    expMonth: Joi.number().integer().min(0).max(11).required().messages({
        "number.base": `"expMonth" must be a number`,
        "any.required": `"expMonth" is a required field`,
    }),
    currentCTC: Joi.number().required().messages({
        "number.base": `"currentCTC" must be a number`,
        "any.required": `"currentCTC" is a required field`,
    }),
    expectedCTC: Joi.number().required().messages({
        "number.base": `"expectedCTC" must be a number`,
        "any.required": `"expectedCTC" is a required field`,
    }),
    mobile: Joi.string().required().messages({
        "string.pattern.base": `"mobile" must be a valid Indian mobile number with country code (+91XXXXXXXXXX)`,
        "string.base": `"mobile" must be a string`,
        "any.required": `"mobile" is a required field`,
    }),
    position: Joi.string().required().messages({
        "string.base": `"position" must be a string`,
        "any.required": `"position" is a required field`,
    }),
    file: Joi.string().required().messages({
        "string.base": `"file" must be a string`,
        "any.required": `"file" is a required field`,
    }),
});

export const idValidation = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        'string.length': 'ID must be exactly 24 characters long.',
        'string.hex': 'ID must be a valid hex string.',
        'any.required': 'ID is required.'
    }),
});
