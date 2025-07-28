import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const portfolioSchema = new Schema({
    image: { type: String, required: true },
    mainImage: { type: String, required: true },
    homeImage: { type: String, required: true },
    logo: { type: String, required: true },
    profileImage: { type: String, required: true },
    title: { type: String, required: true },
    paragraph: { type: String, required: true },
    features: { type: [String], required: true },
    reviewName: { type: String, required: true },
    reviewCount: { type: Number, required: true },
    reviewPosition: { type: String, required: true },
    reviewDescription: { type: String, required: true },
      projectURL: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const portfolioModel = model(dbTableName.PORTFOLIO, portfolioSchema);

export const portfolioValidation = Joi.object({
    image: Joi.string().required().messages({
        "string.base": `"image" must be a string`,
        "any.required": `"image" is a required field`,
    }),
    mainImage: Joi.string().required().messages({
        "string.base": `"mainImage" must be a string`,
        "any.required": `"mainImage" is a required field`,
    }),
    homeImage: Joi.string().required().messages({
        "string.base": `"homeImage" must be a string`,
        "any.required": `"homeImage" is a required field`,
    }),
    logo: Joi.string().required().messages({
        "string.base": `"logo" must be a string`,
        "any.required": `"logo" is a required field`,
    }),
    profileImage: Joi.string().required().messages({
        "string.base": `"profileImage" must be a string`,
        "any.required": `"profileImage" is a required field`,
    }),
    title: Joi.string().required().messages({
        "string.base": `"title" must be a string`,
        "any.required": `"title" is a required field`,
    }),
    paragraph: Joi.string().required().messages({
        "string.base": `"paragraph" must be a string`,
        "any.required": `"paragraph" is a required field`,
    }),
    features: Joi.array().items(Joi.string().messages({
        "string.base": `"features" items must be strings`
    })).required().messages({
        "array.base": `"features" must be an array of strings`,
        "any.required": `"features" is a required field`,
    }),
    reviewName: Joi.string().required().messages({
        "string.base": `"reviewName" must be a string`,
        "string.empty": `"reviewName" is required`,
        "any.required": `"reviewName" is required`
    }),
    reviewCount: Joi.number().required().messages({
        "number.base": `"reviewCount" must be a number`,
        "any.required": `"reviewCount" is required`
    }),
    reviewPosition: Joi.string().required().messages({
        "string.base": `"reviewPosition" must be a string`,
        "string.empty": `"reviewPosition" is required`,
        "any.required": `"reviewPosition" is required`
    }),
    reviewDescription: Joi.string().required().messages({
        "string.base": `"reviewDescription" must be a string`,
        "string.empty": `"reviewDescription" is required`,
        "any.required": `"reviewDescription" is required`
    }),
        projectURL: Joi.string().uri().required().messages({
        "string.base": `"projectURL" must be a string`,
        "string.empty": `"projectURL" is required`,
        "any.required": `"projectURL" is required`,
        "string.uri": `"projectURL" must be a valid URL`
    }),
});
export const idValidation = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        'string.length': 'ID must be exactly 24 characters long.',
        'string.hex': 'ID must be a valid hex string.',
        'any.required': 'ID is required.'
    }),
});
