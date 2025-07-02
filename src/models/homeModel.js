import Joi from "joi";
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { dbTableName } from "../utils/constants.js"

const photoSchema = new Schema({
    imagePosition: { type: Number }, // 1: multi image, 2:single
    mediaType: { type: String, required: true }, // img, vdo
    media: { type: String, required: true },
    isActive: { type: Boolean, default: true },
},
    { timestamps: true },
);

export const homeImgVdoModel = model(dbTableName.HOME_PHOTO, photoSchema);

export const homeImgVdoValidation = Joi.object({
    imagePosition: Joi.number().optional().messages({
        "number.base": "Image position must be a number",
    }),
    mediaType: Joi.string().valid("image", "video").required().messages({
        "string.base": "Media type must be a string",
        "any.only": "Media type must be either 'image' or 'video'",
        "any.required": "Media type is required",
    }),
    media: Joi.string().required().messages({
        "string.base": "Media must be a string",
        "any.required": "Media is required",
    }),
});