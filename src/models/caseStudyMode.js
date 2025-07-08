import Joi from "joi";
const { Schema } = mongoose;
import mongoose, { model } from "mongoose";
import { dbTableName } from "../utils/constants.js"

const caseStudySchema = new Schema({
    mainImage: { type: String, required: true },
    logo: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    p1: { type: String, required: true },
    projectName: { type: String, required: true },
    portfolio: { type: String, required: true },
    duration: { type: String, required: true },
    industry: { type: String, required: true },
    p2: { type: String, required: true },
    challenge: [
        {
            _id: false,
            title: { type: String },
            p: { type: String },
        }
    ],
    stackTech: [String],
    process: [
        {
            _id: false,
            title: { type: String },
            p: { type: String },
        }
    ],
    reviewName: { type: String, required: true },
    reviewPosition: { type: String, required: true },
    reviewCount: { type: Number, required: true },
    reviewDescription: { type: String, required: true },
    typographyImage: { type: String, required: true },
    conclusion: [String],
    projectURL: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const CaseStudy = model(dbTableName.CASESTUDY, caseStudySchema);

export const caseStudyValidation = Joi.object({
    mainImage: Joi.string().required().messages({
        "string.base": "Main Image must be a string",
        "string.empty": "Main Image is required",
        "any.required": "Main Image is required"
    }),
    logo: Joi.string().required().messages({
        "string.base": "Logo must be a string",
        "string.empty": "Logo is required",
        "any.required": "Logo is required"
    }),
    image: Joi.string().required().messages({
        "string.base": "Image must be a string",
        "string.empty": "Image is required",
        "any.required": "Image is required"
    }),
    title: Joi.string().required().messages({
        "string.base": `"title" must be a string`,
        "string.empty": `"title" is required`,
        "any.required": `"title" is required`
    }),
    p1: Joi.string().required().messages({
        "string.base": `"p1" must be a string`,
        "string.empty": `"p1" is required`,
        "any.required": `"p1" is required`
    }),
    projectName: Joi.string().required().messages({
        "string.base": `"projectName" must be a string`,
        "string.empty": `"projectName" is required`,
        "any.required": `"projectName" is required`
    }),
    projectURL: Joi.string().uri().required().messages({
        "string.base": `"projectURL" must be a string`,
        "string.empty": `"projectURL" is required`,
        "any.required": `"projectURL" is required`,
        "string.uri": `"projectURL" must be a valid URL`
    }),
    portfolio: Joi.string().required().messages({
        "string.base": `"portfolio" must be a string`,
        "string.empty": `"portfolio" is required`,
        "any.required": `"portfolio" is required`
    }),
    duration: Joi.string().required().messages({
        "string.base": `"duration" must be a string`,
        "string.empty": `"duration" is required`,
        "any.required": `"duration" is required`
    }),
    industry: Joi.string().required().messages({
        "string.base": `"industry" must be a string`,
        "string.empty": `"industry" is required`,
        "any.required": `"industry" is required`
    }),
    p2: Joi.string().required().messages({
        "string.base": `"p2" must be a string`,
        "string.empty": `"p2" is required`,
        "any.required": `"p2" is required`
    }),
    challenge: Joi.array().items(Joi.object({
        title: Joi.string().required().messages({
            "string.empty": `"challenge.title" is required`,
            "any.required": `"challenge.title" is required`
        }),
        p: Joi.string().required().messages({
            "string.empty": `"challenge.p" is required`,
            "any.required": `"challenge.p" is required`
        })
    })).required().messages({
        "array.base": `"challenge" must be an array of objects`,
        "any.required": `"challenge" is required`
    }),
    stackTech: Joi.array().items(Joi.string()).required().messages({
        "array.base": `"stackTech" must be an array of strings`,
        "any.required": `"stackTech" is required`
    }),
    process: Joi.array().items(Joi.object({
        title: Joi.string().required().messages({
            "string.empty": `"process.title" is required`,
            "any.required": `"process.title" is required`
        }),
        p: Joi.string().required().messages({
            "string.empty": `"process.p" is required`,
            "any.required": `"process.p" is required`
        })
    })).required().messages({
        "array.base": `"process" must be an array of objects`,
        "any.required": `"process" is required`
    }),
    typographyImage: Joi.string().required().messages({
        "string.base": "Typography Image must be a string",
        "string.empty": "Typography Image is required",
        "any.required": "Typography Image is required"
    }),
    reviewName: Joi.string().required().messages({
        "string.base": `"reviewName" must be a string`,
        "string.empty": `"reviewName" is required`,
        "any.required": `"reviewName" is required`
    }),
    reviewPosition: Joi.string().required().messages({
        "string.base": `"reviewPosition" must be a string`,
        "string.empty": `"reviewPosition" is required`,
        "any.required": `"reviewPosition" is required`
    }),
    reviewCount: Joi.number().required().messages({
        "number.base": `"reviewCount" must be a number`,
        "any.required": `"reviewCount" is required`
    }),
    reviewDescription: Joi.string().required().messages({
        "string.base": `"reviewDescription" must be a string`,
        "string.empty": `"reviewDescription" is required`,
        "any.required": `"reviewDescription" is required`
    }),
    conclusion: Joi.array().items(Joi.string()).required().messages({
        "array.base": `"conclusion" must be an array of strings`,
        "any.required": `"conclusion" is required`
    }),
});
