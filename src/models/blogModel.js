import mongoose from "mongoose";
import { dbTableName } from "../utils/constants.js";

const detailSchema = new mongoose.Schema({
    paragraph: [{ type: String, required: true }],
    image: { type: String, default: null }
}, { _id: false });

const blogSchema = new mongoose.Schema({
    mainImage: { type: String, required: true },
    details: { type: [detailSchema], required: true },
    table: [{ type: String }],
    createdBy: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Blog = mongoose.model(dbTableName.BLOG, blogSchema);


// export const blogValidation = Joi.object({
//     mainImage: Joi.string().required(),
//     details: Joi.array().items(
//         Joi.object({
//             paragraph: Joi.array().items(Joi.string().required()).required(),
//             image: Joi.string().optional().allow(null, "")
//         })
//     ).required(),
//     table: Joi.array().items(Joi.string()).optional(),
//     createdBy: Joi.string().required()
// });
import Joi from "joi";

export const blogValidation = Joi.object({
    mainImage: Joi.string()
        .required()
        .messages({
            "string.base": `"mainImage" must be a string`,
            "any.required": `"mainImage" is a required field`,
        }),

    details: Joi.array()
        .items(
            Joi.object({
                paragraph: Joi.array()
                    .items(Joi.string().required().messages({
                        "string.base": `"paragraph" items must be strings`,
                        "any.required": `"paragraph" item is required`
                    }))
                    .required()
                    .messages({
                        "array.base": `"paragraph" must be an array of strings`,
                        "any.required": `"paragraph" is a required field`,
                    }),

                image: Joi.string()
                    .allow(null, "")
                    .optional()
                    .messages({
                        "string.base": `"image" must be a string or null`,
                    }),
            }).messages({
                "object.base": `"details" item must be an object with paragraph and optional image`,
            })
        )
        .required()
        .messages({
            "array.base": `"details" must be an array of objects`,
            "any.required": `"details" is a required field`,
        }),

    table: Joi.array()
        .items(Joi.string().messages({
            "string.base": `"table" items must be strings`
        }))
        .optional()
        .messages({
            "array.base": `"table" must be an array of strings`,
        }),

    createdBy: Joi.string()
        .required()
        .messages({
            "string.base": `"createdBy" must be a string`,
            "any.required": `"createdBy" is a required field`,
        }),
});
