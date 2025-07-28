import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const aboutSchema = new Schema({
    media: { type: String, required: true }, // img, vdo
    // mediaType: { type: String, required: true }, // img, vdo
    isActive: { type: Boolean, default: true },
},
    { timestamps: true },
);
export const aboutModel = model(dbTableName.ABOUT_VID, aboutSchema);

export const aboutValidation = Joi.object({
    media: Joi.string().required().messages({
        "string.base": "Media must be a string",
        "any.only": "Media must be either 'image' or 'video'",
        "any.required": "Media is required",
    }),
    // mediaType: Joi.string().valid("image", "video").required().messages({
    //     "string.base": "Media type must be a string",
    //     "any.only": "Media type must be either 'image' or 'video'",
    //     "any.required": "Media type is required",
    // }),
});