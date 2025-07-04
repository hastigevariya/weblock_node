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

export const ReviewModel = model(dbTableName.REVIEW, reviewSchema);

export const reviewValidation = Joi.object({
    name: Joi.string().required(),
    position: Joi.string().required(),
    review: Joi.string().required(),
    photo: Joi.string().required()
});
