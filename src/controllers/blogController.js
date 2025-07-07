import { blogValidation } from "../models/blogModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";
import { blogService } from "../services/blogService.js";
import mongoose from "mongoose";

// export const addBlog = async (req, res) => {
//     try {
//         const mainImage = req?.file?.filename;
//         req.body.mainImage = mainImage;

//         const { error } = blogValidation.validate(req.body);
//         if (error) {
//             return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
//         }

//         const newBlog = await blogService.addBlog(req.body);
//         return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_SUCCESS, newBlog);
//     } catch (error) {
//         console.error("Error in addBlog:", error);
//         return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
//     }
// };
export const addBlog = async (req, res) => {
    try {
        const mainImage = req?.file?.filename;
        req.body.mainImage = mainImage;
        if (typeof req.body.details === "string") {
            try {
                req.body.details = JSON.parse(req.body.details);
            } catch (e) {
                return response.error(res, resStatusCode.CLIENT_ERROR, `"details" must be a valid JSON array`, {});
            }
        }

        if (typeof req.body.table === "string") {
            try {
                req.body.table = JSON.parse(req.body.table);
            } catch (e) {
                return response.error(res, resStatusCode.CLIENT_ERROR, `"table" must be a valid JSON array`, {});
            }
        }

        const { error } = blogValidation.validate(req.body);
        if (error) {
            return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
        }

        const newBlog = await blogService.addBlog(req.body);
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_SUCCESS, newBlog);
    } catch (error) {
        console.error("Error in addBlog:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getAllBlogs();
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, blogs);
    } catch (error) {
        console.error("Error in getAllBlogs:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.error(res, resStatusCode.CLIENT_ERROR, "Invalid blog ID", {});
        }

        const blog = await blogService.getBlogById(id);
        if (!blog) {
            return response.error(res, resStatusCode.NOT_FOUND, "Blog not found", {});
        }

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.FETCHED, blog);
    } catch (error) {
        console.error("Error in getBlogById:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.error(res, resStatusCode.CLIENT_ERROR, "Invalid blog ID", {});
        }

        const deleted = await blogService.deleteBlog(id);
        if (!deleted) {
            return response.error(res, resStatusCode.NOT_FOUND, "Blog not found", {});
        }

        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETED, {});
    } catch (error) {
        console.error("Error in deleteBlog:", error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    }
};