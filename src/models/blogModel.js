import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js";
import Joi from "joi";

const detailSchema = new Schema({
    paragraph: [{ type: String, required: true }],
    image: { type: String, default: '' }
}, { _id: false });

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    mainImage: { type: String, required: true },
    details: { type: [detailSchema] },
    table: { type: [String] },
    createdBy: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true },
);

export const blogModel = model(dbTableName.BLOG, blogSchema);

export const blogValidation = Joi.object({
    title: Joi.string().required().messages({
        "string.base": `"title" must be a string`,
        "any.required": `"title" is a required field`,
    }),
    mainImage: Joi.string().required().messages({
        "string.base": `"mainImage" must be a string`,
        "any.required": `"mainImage" is a required field`,
    }),
    details: Joi.array().items(Joi.object({
        paragraph: Joi.array()
            .items(Joi.string().optional().messages({
                "string.base": `"paragraph" items must be strings`,
                "any.required": `"paragraph" item is required`
            })).optional().messages({
                "array.base": `"paragraph" must be an array of strings`,
                "any.required": `"paragraph" is a required field`,
            }),
        image: Joi.string().optional(),
    }).messages({
        "object.base": `"details" item must be an object with paragraph and optional image`,
    })).required().messages({
        "array.base": `"details" must be an array of objects`,
        "any.required": `"details" is a required field`,
    }),
    table: Joi.array().items(Joi.string().messages({
        "string.base": `"table" items must be strings`
    })).optional().messages({
        "array.base": `"table" must be an array of strings`,
    }),
    createdBy: Joi.string().required().messages({
        "string.base": `"createdBy" must be a string`,
        "any.required": `"createdBy" is a required field`,
    }),
});

export const idValidation = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        "string.base": "ID must be a string",
        "string.empty": "ID is required",
        "string.length": "ID must be exactly 24 characters",
        "string.hex": "ID must be a valid hexadecimal string",
        "any.required": "ID is required",
    }),
});