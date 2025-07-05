import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const portfolioSchema = new Schema({
    image: { type: String, required: true },
    mainImage: { type: String, required: true },
    title: { type: String, required: true },
    paragraph: { type: String, required: true },
    features: { type: [String], required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Portfolio = model(dbTableName.PORTFOLIO, portfolioSchema);

export const portfolioValidation = Joi.object({
    image: Joi.string()
        .required()
        .messages({
            "string.base": `"image" must be a string`,
            "any.required": `"image" is a required field`,
        }),
    mainImage: Joi.string()
        .required()
        .messages({
            "string.base": `"mainImage" must be a string`,
            "any.required": `"mainImage" is a required field`,
        }),
    title: Joi.string()
        .required()
        .messages({
            "string.base": `"title" must be a string`,
            "any.required": `"title" is a required field`,
        }),
    paragraph: Joi.string()
        .required()
        .messages({
            "string.base": `"paragraph" must be a string`,
            "any.required": `"paragraph" is a required field`,
        }),
    features: Joi.array()
        .items(Joi.string().messages({ "string.base": `"features" items must be strings` }))
        .required()
        .messages({
            "array.base": `"features" must be an array of strings`,
            "any.required": `"features" is a required field`,
        }),
});
