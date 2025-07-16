const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js";
import mongoose, { model } from "mongoose";
import Joi from 'joi';

const reviewSchema = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    review: { type: String, required: true },
    photo: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const reviewModel = model(dbTableName.REVIEW, reviewSchema);

export const reviewValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.base": `"name" must be a string`,
        "string.empty": `"name" is required`,
        "any.required": `"name" is required`
    }),
    position: Joi.string().required().messages({
        "string.base": `"position" must be a string`,
        "string.empty": `"position" is required`,
        "any.required": `"position" is required`
    }),
    review: Joi.string().required().messages({
        "string.base": `"review" must be a string`,
        "string.empty": `"review" is required`,
        "any.required": `"review" is required`
    }),
    photo: Joi.string().required().messages({
        "string.base": `"photo" must be a string`,
        "string.empty": `"photo" is required`,
        "any.required": `"photo" is required`
    }),
});