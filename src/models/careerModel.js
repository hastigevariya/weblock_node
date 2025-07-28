import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import Joi from "joi";
import { dbTableName } from "../utils/constants.js";

const careerSchema = new Schema({
    title: { type: String, required: true },
    experience: { type: String, required: true },
    position: { type: Number, required: true },
    jobLocation: { type: String, required: true },
    officeTimings: { type: String, required: true },
    responsibility: [{ type: String, required: true }],
    skills: [{ type: String, required: true }],
    benefits: [{ type: String, required: true }],
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const careerModel = model(dbTableName.CAREER, careerSchema);

export const careerValidation = Joi.object({
    title: Joi.string().required().messages({
        "string.base": `"jobTitle" must be a string`,
        "any.required": `"jobTitle" is a required field`,
    }),
    experience: Joi.string().required().messages({
        "string.base": `"experience" must be a string`,
        "any.required": `"experience" is a required field`,
    }),
    position: Joi.number().required().messages({
        "number.base": `"positionOpen" must be a number`,
        "any.required": `"positionOpen" is a required field`,
    }),
    jobLocation: Joi.string().required().messages({
        "string.base": `"jobLocation" must be a string`,
        "any.required": `"jobLocation" is a required field`,
    }),
    officeTimings: Joi.string().required().messages({
        "string.base": `"officeTimings" must be a string`,
        "any.required": `"officeTimings" is a required field`,
    }),
    responsibility: Joi.array().items(Joi.string().messages({
        "string.base": `"responsibility" items must be strings`
    })).required().messages({
        "array.base": `"responsibility" must be an array of strings`,
        "any.required": `"responsibility" is a required field`,
    }),
    skills: Joi.array().items(Joi.string().messages({
        "string.base": `"skillsRequired" items must be strings`
    })).required().messages({
        "array.base": `"skillsRequired" must be an array of strings`,
        "any.required": `"skillsRequired" is a required field`,
    }),
    benefits: Joi.array().items(Joi.string().messages({
        "string.base": `"benefits" items must be strings`
    })).required().messages({
        "array.base": `"benefits" must be an array of strings`,
        "any.required": `"benefits" is a required field`,
    }),
});

export const idValidation = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        'string.length': 'ID must be exactly 24 characters long.',
        'string.hex': 'ID must be a valid hex string.',
        'any.required': 'ID is required.'
    }),
});
